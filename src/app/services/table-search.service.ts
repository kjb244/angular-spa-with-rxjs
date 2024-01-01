import {Injectable} from '@angular/core';
import {Data} from "../models/table.model";
import {ComparisonType, SqlResults, ValidKeywords, ValidPlusMinus} from "../models/table-search.model";
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})


export class TableSearchService {

  private validColumnNames: string[] = ['name','date','age','types'];

  constructor() { }

  public inSqlMode(search: string): boolean{
    return /^=.*$/.test(search)
  }

  private hasAtLeastTwoAndEvenNumberOfQuotes(search: string){
    const times = search.length - search.replace(/'/g,'').length;
    return times > 1 && times % 2 === 0;
  }

  private hasTwoParenthesisFrontAndEnd(search: string){
    const searchNoFrontAndBack: string = search.trim().replace(/^(\()(.*)(\))$/,'\$2');

   return !searchNoFrontAndBack.includes('(') &&
     !searchNoFrontAndBack.includes(')') &&
     search.trim().length - searchNoFrontAndBack.length === 2;
  }

  private inBetweenHasCorrectNumberQuotes(search: string){
    const searchNoFrontAndBack: string = search.trim().replace(/^(\()(.*)(\))$/,'\$2');
    return searchNoFrontAndBack.split(',').reduce((accum: boolean, e: string) =>{
      accum = accum && e.trim() === "''";
      return accum;
    }, true)
  }

  private getStatementPossibilities(validKeywords: ValidKeywords[]): string[]{
    return this.validColumnNames.reduce((accum: string[], columnName: string) =>{
      validKeywords.forEach((keyword: ValidKeywords)=>{
        accum.push(columnName + ' ' + keyword);
        accum.push(columnName + keyword);
      })

      return accum;
    },[])
  }

  private getRightHandSide(possibilities: string[], sqlCommand: string){
    //sort possibilities in reverse so <= comes before < and the replace works for say <='2023-02-01'
    possibilities.sort((a,b) => -1*a.localeCompare(b));
    return possibilities.reduce((accum: string, possibility: string) =>{
      accum = accum.replace(possibility, '');
      return accum;
    },sqlCommand).trim();
  }


  private isStringAValidDateOrNumber(search: string){
    const validDate: boolean =
      /^\d{4}-\d{2}-\d{2}$/.test(search.replace(/"/g,'').replace(/'/g,''));
    const validNumber: boolean = /^\d+$/.test(search.replace(/"/g,'').replace(/'/g,''));
    return validDate || validNumber;
  }

  // =name = 'baby' and types in ('complete','in process')
  public isValidSql(search: string): boolean {
    const passedInSearch = JSON.parse(JSON.stringify(search));
    let valid = this.inSqlMode(search);
    if(valid){
      search = search.substring(1).toLowerCase();
      search = search.replace(/('.*?')/g, (match,contents)=>{return "''"});
      search = search.replace(/\s{2,}/, ' ');
      const sqlCommands: string[] = search.split('and');
      for(let i=0; i<sqlCommands.length; i++){
        let atLeastOneCommandHit: boolean = false;
        const command: string = sqlCommands[i].trim();
        const equalPossibilities: string[] = this.getStatementPossibilities([ValidKeywords.EQUALS]);
        const inPossibilities: string[] = this.getStatementPossibilities([ValidKeywords.IN]);
        const gtLtPossibilities: string[] = this.getStatementPossibilities(
          [ValidKeywords.GREATER_THAN,
            ValidKeywords.GREATER_THAN_EQUALS,
            ValidKeywords.LESS_THAN,
            ValidKeywords.LESS_THAN_EQUALS]);
        const betweenPossibilities: string[] = this.getStatementPossibilities([ValidKeywords.BETWEEN]);

        if(equalPossibilities.find(x => command.includes(x))){
          atLeastOneCommandHit = true;
          const rightSide = this.getRightHandSide(equalPossibilities, command);
          valid = valid && rightSide === "''";
        } else if (inPossibilities.find(x => command.includes(x))){
          atLeastOneCommandHit = true;
          const rightSide = this.getRightHandSide(inPossibilities, command);
          valid = valid && this.hasTwoParenthesisFrontAndEnd(rightSide);
          valid = valid && this.inBetweenHasCorrectNumberQuotes(rightSide);
        } else if (gtLtPossibilities.find(x => command.includes(x))){
          atLeastOneCommandHit = true;
          const rightSide = this.getRightHandSide(gtLtPossibilities, command);
          valid = valid && rightSide === "''";
          const passedInAtIndex: string = passedInSearch.substring(1).split('and')[i];
          const rightSidePassedIn = this.getRightHandSide(gtLtPossibilities, passedInAtIndex);
          valid = valid && (this.isStringAValidDateOrNumber(rightSidePassedIn) ||
            [ValidPlusMinus.TODAY, ValidPlusMinus.TODAY_PlUS_MINUS].includes(this.validPlusMinus(rightSidePassedIn)));
        } else if (betweenPossibilities.find(x => command.includes(x))){
          atLeastOneCommandHit = true;
          const rightSide = this.getRightHandSide(betweenPossibilities, command);
          valid = valid && this.hasTwoParenthesisFrontAndEnd(rightSide);
          valid = valid && this.inBetweenHasCorrectNumberQuotes(rightSide);
          const passedInAtIndex: string = passedInSearch.substring(1).split('and')[i];
          const rightSidePassedIn = this.getRightHandSide(betweenPossibilities, passedInAtIndex);
          valid = valid && this.getSearchArray(rightSidePassedIn).length === 2;
          valid = valid && this.getSearchArray(rightSidePassedIn).every(e => this.isStringAValidDateOrNumber(e));
        }
        valid = valid && atLeastOneCommandHit;
        if(!valid){
          break;
        }
      }
    }


    return valid;
  }
  //'12','1,3' --> ['12','1,3']
  //types in ('12') and foo='bandr'
  private splitIgnoreInParenthesis(searchStatement: string, splitChar: string): string[]{
    function lookAheadMatch(currIndex: number){
      const indexes: number[] = [];
      const match: boolean =  splitChar.split('').map((e: string, i: number) =>{
        indexes.push(currIndex + i);
        return searchStatement.charAt(currIndex + i);
      }).join('') === splitChar;
      return match ? indexes : [];
    }
    const returnSearchArray: string[] = [];
    let numQuotes: number = 0;
    let currWord: string = '';
    searchStatement = searchStatement.trim();
    let skipIndexes: number[] = [];
    const searchStatementIntoCharArr: string[] = searchStatement.split('');
    for(let i=0; i<searchStatementIntoCharArr.length;i++){
      const char: string = searchStatementIntoCharArr[i];
      skipIndexes = skipIndexes.includes(i) ? skipIndexes : lookAheadMatch(i);

      if(char === "'") {
        numQuotes++;
      }

      if(!skipIndexes.includes(i)){
        currWord += char;
      }

      if(numQuotes >0 && numQuotes %2 === 0 && skipIndexes.includes(i) && skipIndexes[skipIndexes.length-1] === i){

        returnSearchArray.push(currWord.toLowerCase().trim());
        currWord = '';
        numQuotes = 0;
      }
    }

    if(numQuotes >0 && numQuotes %2 === 0){
      returnSearchArray.push(currWord.toLowerCase().trim());
    }

    return returnSearchArray;
  }

  private validPlusMinus(input: string): ValidPlusMinus{
    input = input.replace(/"'"/g,'').replace(/'/g,'');
    const todayRegex = /^today\(\)$/;
    const todayPlusMinusRegex = /^today\(-?\d+(m|d)\)$/;
    const isToday = todayRegex.test(input.trim());
    const isTodayPlusMinus = todayPlusMinusRegex.test(input.trim());
    if(isToday){
      return ValidPlusMinus.TODAY
    } else if (isTodayPlusMinus){
      return ValidPlusMinus.TODAY_PlUS_MINUS
    } else {
      return ValidPlusMinus.NULL
    }
  }

  private todayMinusPlus(input: string){
    const validPlusMinus: ValidPlusMinus = this.validPlusMinus(input);
    if(validPlusMinus === ValidPlusMinus.TODAY){
      return moment(new Date()).format('YYYY-MM-DD');
    } else if (validPlusMinus === ValidPlusMinus.TODAY_PlUS_MINUS){
      const timesSign: number = input.includes('-') ? -1 : 1;
      const day: boolean = /\d+d/.test(input);
      const unit: string = (input.match(/\d+/) || ['0'])[0];
      const addMonthsOrDays = day ? moment(new Date()).add(timesSign * Number(unit), 'd') :
        moment(new Date()).add(timesSign * Number(unit), 'M');
      return moment(addMonthsOrDays).format('YYYY-MM-DD');
    }
    return input;
  }

  private getSearchArray(searchStatement: string): string[]{
    searchStatement = searchStatement.trim().replace(/^(\()(.*)(\))$/,'\$2');
    return this.splitIgnoreInParenthesis(searchStatement, ",").map((e: string) => {
      const cleaned: string = e.replace(/'/g,'');
      return this.todayMinusPlus(cleaned);

    })

  }

  private greaterThan(base: string, compare: string){
    return Number(base.replace(/[^\d]/g,'')) > Number(compare.replace(/[^\d]/g,''));
  }

  private greaterThanEqual(base: string, compare: string){
    return Number(base.replace(/[^\d]/g,'')) >= Number(compare.replace(/[^\d]/g,''));
  }

  private lessThan(base: string, compare: string){
    return Number(base.replace(/[^\d]/g,'')) < Number(compare.replace(/[^\d]/g,''));
  }

  private lessThanEqual(base: string, compare: string){
    return Number(base.replace(/[^\d]/g,'')) <= Number(compare.replace(/[^\d]/g,''));
  }

  // =name = 'baby' and types in ('complete','in process')
  public executeSql(searchStatement: string, dataArray: Data[]): SqlResults{
    let valid = false;
    let dataResults: Data[] = dataArray.filter(e => true);
    searchStatement = searchStatement.replace(/"/g,"'");
    valid = this.isValidSql(searchStatement);
    if(valid){
      //strip out first equals
      searchStatement= searchStatement.substring(1);
      const sqlCommands: string[] = this.splitIgnoreInParenthesis(searchStatement, 'and');
      let numberKeywords: number = 0;
      sqlCommands.forEach((command: string) =>{
        let column: string = '';
        let searchField: string = '';
        const equalPossibilities: string[] = this.getStatementPossibilities([ValidKeywords.EQUALS]);
        const inPossibilities: string[] = this.getStatementPossibilities([ValidKeywords.IN]);
        const gtLtPossibilities: string[] = this.getStatementPossibilities(
          [ValidKeywords.GREATER_THAN,
            ValidKeywords.GREATER_THAN_EQUALS,
            ValidKeywords.LESS_THAN,
            ValidKeywords.LESS_THAN_EQUALS]);
        const betweenPossibilities: string[] = this.getStatementPossibilities([ValidKeywords.BETWEEN]);
        const comparisonType: ComparisonType =
          equalPossibilities.find(x => command.includes(x)) ? ComparisonType.EQUALS :
            (inPossibilities.find(x => command.includes(x)) ? ComparisonType.IN :
              (gtLtPossibilities.find(x => command.includes(x)) ? ComparisonType.LESS_THAN_GREATER_THAN_EQUALS :
                  (betweenPossibilities.find(x => command.includes(x)) ? ComparisonType.BETWEEN : ComparisonType.NULL)
          ));
        if(comparisonType === ComparisonType.EQUALS){
          numberKeywords++;
          column = command.split(ValidKeywords.EQUALS)[0].trim();
          searchField = this.getRightHandSide(equalPossibilities,command);
        } else if (comparisonType === ComparisonType.IN){
          numberKeywords++;
          column = command.split(ValidKeywords.IN)[0].trim();
          searchField = this.getRightHandSide(inPossibilities, command);
        } else if (comparisonType === ComparisonType.BETWEEN){
          numberKeywords++;
          column = command.split(ValidKeywords.BETWEEN)[0].trim();
          searchField = this.getRightHandSide(betweenPossibilities, command);
        } else if (comparisonType === ComparisonType.LESS_THAN_GREATER_THAN_EQUALS){
          const values:string[] = Object.values(ValidKeywords).sort((a,b) =>{
            return a.length - b.length
          }).reverse();

          for(let i=0; i< values.length; i++){
            const split: string[] = command.split(values[i]);
            if(split.length === 2){
              numberKeywords++;
              column = split[0].trim();
              searchField = this.getRightHandSide(gtLtPossibilities, command);
              break;
            }
          }
        }
        if(numberKeywords > 0){
          const searchArray: string[] = this.getSearchArray(searchField);
          const indexToSearch = this.validColumnNames.indexOf(column.toLowerCase());
          dataResults = dataResults.filter((data) =>{
            if(comparisonType === ComparisonType.EQUALS || comparisonType === ComparisonType.IN){
              return searchArray.some(e => e === data[indexToSearch]);
            } else if(comparisonType === ComparisonType.BETWEEN){
              return this.greaterThanEqual(data[indexToSearch], searchArray[0]) &&
                this.lessThanEqual(data[indexToSearch], searchArray[1])
            } else if (comparisonType === ComparisonType.LESS_THAN_GREATER_THAN_EQUALS) {
              if(command.includes(ValidKeywords.GREATER_THAN_EQUALS)){
                return searchArray.some(e => this.greaterThanEqual(data[indexToSearch], e));
              } else if (command.includes(ValidKeywords.LESS_THAN_EQUALS)){
                return searchArray.some(e => this.lessThanEqual(data[indexToSearch], e));
              } else if (command.includes(ValidKeywords.GREATER_THAN)){
                return searchArray.some(e => this.greaterThan(data[indexToSearch], e));
              } else if (command.includes(ValidKeywords.LESS_THAN)){
                return searchArray.some(e => this.lessThan(data[indexToSearch], e));
              } else {
                return false;
              }
            } else {
              return false;
            }

          })
        }
        numberKeywords = 0;

      });
    }

    return {
      valid,
      data: dataResults
    }


  }
}
