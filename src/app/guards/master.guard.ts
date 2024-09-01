import { CanActivateFn } from '@angular/router';
import {contentGuard} from "./content.guard";
import {mvpGuard} from "./mvp.guard";

export const masterGuard: CanActivateFn = (route, state): Promise<boolean> => {
  return new Promise(async (resolve) => {
    const guards: CanActivateFn[] = [contentGuard, mvpGuard];
    for (let i = 0; i < guards.length; i++) {
      const guardResult = await guards[i](route, state);
      if (!guardResult) {
        resolve(false);
      }
    }
    resolve(true);
  })


};

