import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../auth/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUser(id:number):Observable<User>
  {
    return this.http.get<User>(environment.urlApi+"user/"+id).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Error: ', error.error);
    }else{
      console.error("backend return status code:", error.status, error.error);
    }

    return throwError(()=> new Error("Someone failed, try again"));
  }
}
