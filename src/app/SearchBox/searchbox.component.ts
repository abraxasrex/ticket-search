import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {debounceTime, distinctUntilChanged, tap, mergeMap, catchError} from 'rxjs/operators';
import {Observable, Subscription, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {API_KEY} from '../constants/constants';

@Component({
  selector: 'search-box',
  templateUrl: './searchbox.component.html'
})
export class SearchBoxComponent implements OnInit {

  private  apiPrefix = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword=';  // URL to web api
  private apiSuffix = '&source=universe&countryCode=US&apikey=';
  
  searchBoxState: FormControl = new FormControl('');
  @Output() apiSearchResults = new EventEmitter();
  @Output() searchTermUpdated = new EventEmitter();
  subscription: Subscription = new Subscription();

  constructor(private http: HttpClient) {}

  private getSearchResults (val: any): Observable<any>  {
    return this.http.get<any>(this.apiPrefix + val + this.apiSuffix + API_KEY);
  }

  ngOnInit () {
      this.subscription = this.searchBoxState.valueChanges
        .pipe(
          debounceTime(600),
          distinctUntilChanged(),
          tap(text => this.searchTermUpdated.emit(text))
        )
        .pipe(
            mergeMap((data: any)=> {
              return this.getSearchResults(data);
            }),
            catchError(this.handleError)
        ).subscribe((results)=> {
          if(results._embedded?.events?.length > 0) {
            this.apiSearchResults.emit(results._embedded.events);
          } else {
            this.apiSearchResults.emit(null);
          }
        });
  }

  handleError(error) {
    let errorMessage = `Error Message: ${(error?.error.message || error.message)}`;
    let errorStatus = error.status ? ` Error status: ${error.status}` : '';
    let errorText = errorMessage + errorStatus;

    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}