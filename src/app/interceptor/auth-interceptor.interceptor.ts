/*
import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { environment } from "../../env/environment";

export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
debugger;
  const authService = inject(AuthService);

  const PUBLIC_URLS = [
    { url: '/auth/', methods: ['POST', 'GET', 'PUT', 'DELETE'] },
    { url: '/almacenes/', methods: ['POST', 'GET'] },
    { url: '/provincia/', methods: ['GET'] },
    /*    { url: '/evento/', methods: ['GET'] },
 
  ];


  const requestUrl = new URL(request.url, environment.apiUrl).pathname;

  const isPublic = PUBLIC_URLS.some((route) => 
    requestUrl.startsWith(route.url) && route.methods.includes(request.method)
  );
  if (!isPublic) {
/*
    const token = authService.getTokens();
    if(token){
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
/*
      let clonedRequest = request.clone({
        setHeaders:{
          Authorization: `Bearer ${authService.getTokens()}`,
        }

    
}s
  return next(request);
}
return next(request);
}
    

      setHeaders: {
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization',
      }
*/
  

/*
    const token = authService.getTokens();
    if (token) {
      clonedRequest = clonedRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
*/
/*

    return next(clonedRequest);
  }

  return next(request);
}
}
*/
