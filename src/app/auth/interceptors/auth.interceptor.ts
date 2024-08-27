import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const jwtToken = getJwtToken();
  
  if (jwtToken) {
   
    var cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    return next(cloned);
  } else {
    
  }
  return next(req);
};

function getJwtToken(): string | null {
  let tokens: any = localStorage.getItem('JWT_TOKEN');
  if (!tokens) return null;
  const token = JSON.parse(tokens).token;

  return token;
}