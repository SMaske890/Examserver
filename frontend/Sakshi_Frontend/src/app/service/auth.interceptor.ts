import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

// const TOKEN_HEADER = 'Authorization';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private loginService:LoginService){}

    intercept(req:HttpRequest<any> , next:HttpHandler): Observable<HttpEvent<any>>{
    
        let newReq = req;
        let token = this.loginService.getToken();

        // console.log("Interceptor" , token);

        if(token!=null){
            newReq = newReq.clone({setHeaders:{Authorization:`Bearer ${token}`}});
        }
        return next.handle(newReq);
    }

}


// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     constructor(private login: LoginService) {

//     }

//     intercept(
//         req: HttpRequest<any>,
//         next: HttpHandler
//     ): Observable<HttpEvent<any>> {
//         //add jwt token (localstorage ) request
//         let authReq = req;
//         const token = this.login.getToken();
//         console.log("Inside interceptor");
        
//         if (token != null) {
//             authReq = authReq.clone({
//                 setHeaders: {
//                     Authorization: `Bearer + ${token}`
//                 },
//             });
//         }
//         return next.handle(authReq);
//     }
// }



// export const authInterceptorProviders = [
//     {
//         provide: HTTP_INTERCEPTORS,
//         useClass: AuthInterceptor,
//         multi: true,
//     }
// ]