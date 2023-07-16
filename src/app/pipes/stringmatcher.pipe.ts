import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringmatcher'
})
export class StringmatcherPipe implements PipeTransform {

  transform(value: string, innerStr: string): string {
    const re = new RegExp(innerStr);
    return value.replace(re,function(e){
      return '<b class="yellow">' + e + '</b>';
    });
  }

}
