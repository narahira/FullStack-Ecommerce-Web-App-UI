import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const router = isPlatformBrowser(platformId) ? inject(Router) : null;
  // const router = inject(Router);

  return next(req).pipe(
    catchError((err : HttpErrorResponse)=>{
      if(isPlatformBrowser(platformId)){
        if(err.status === 404){
          router?.navigate(['/not-found']);
        }
        if(err.status === 401){
          router?.navigate(['/un-authenticated']);
        }
        if(err.status === 500){
          router?.navigate(['/server-error']);
        }
      }

      return throwError(()=>err);
    })
  );
};
