import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

export class Common {

  handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return throwError(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return throwError((modelStateErrors || 'Server error'));
  }

  header() {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return {headers};
  }

  jwtHeader() {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    if (token) {
        headers = headers.append('Authorization', 'Bearer ' + token);
    }

    return {headers};
  }

  // jwtWithBody(body: any) {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //       const headers = new HttpHeaders();
  //       headers.append('Content-Type', 'application/json');
  //       headers.append('Authorization', 'Bearer ' + token);
  //       return {headers, body};
  //   }
  // }

}
