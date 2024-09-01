import { CanActivateFn } from '@angular/router';
import {MockService} from "../services/mock.service";
import {inject} from "@angular/core";

export const contentGuard: CanActivateFn = (route, state): Promise<boolean> => {
  const mockService: MockService = inject(MockService);

  return new Promise((resolve) =>{
    mockService.getData().then(() =>{
      resolve(true);
    })
  })
};
