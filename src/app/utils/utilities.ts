import { Actions } from "../store/actions";
import { Router } from '@angular/router';


class Utilities{

  constructor(private router: Router){
  }

  subscribeLogic(state: { [key: string]: any }, formData: { [key: string]: any }){
    const { currRoute, routeMapping, type } = state;
    if(type === Actions.CLICK_NEXT || type === Actions.CLICK_PREVIOUS){
      this.router.navigateByUrl('/' + currRoute);
    } else if (type === Actions.GET_DATA){
      const mapping = routeMapping[currRoute || ''] || {};
      if (mapping && mapping.formData){
        for(let key in formData){
          const memoryData = mapping.formData[key];
          if(memoryData){
            formData[key] = memoryData;

          }
        }
      }
    }
  }



}

export default Utilities;
