import { Actions } from "../store/actions";
import { Router } from '@angular/router';


class Utilities{

  constructor(private router: Router){
  }

  subscribeLogic(state: { [key: string]: any }, formDataComponent: { [key: string]: any } = {} ){
    const { currRoute, formData, type } = state;
    if(type === Actions.NEXT_VIEW){
      this.router.navigateByUrl('/' + currRoute);
    } else if (type === Actions.GET_DATA){
          if (formData){
            for(let key in formData){
              const memoryData = formData[key];
              if(memoryData){
                formDataComponent[key] = memoryData;

              }
            }
          }
    }
  }



}

export default Utilities;
