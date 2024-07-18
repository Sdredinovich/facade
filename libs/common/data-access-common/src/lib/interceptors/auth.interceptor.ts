import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export const authInterceptor = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

  const clonedRequest = request.clone({
    withCredentials: true,
    setHeaders: {
      'Content-Type': 'application/json'  // Устанавливаем заголовок Content-Type
    }
  });

  return next(clonedRequest)
};
