import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { Event } from 'src/app/models/event';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  private baseURL = 'https://localhost:44307/'

  getCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseURL}category?username=test`).pipe(catchError(this.handleError));
  }

  getEvents() : Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseURL}event?username=test`).pipe(catchError(this.handleError));
  }


  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
}
}
