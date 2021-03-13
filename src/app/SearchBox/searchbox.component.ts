import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, tap, mergeMap} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {API_KEY} from '../constants/constants';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'search-box',
  templateUrl: './searchbox.component.html'
})
export class SearchBoxComponent implements OnInit {

  public displayVar = "boom";
  private  apiPrefix = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword=';  // URL to web api
  private apiSuffix = '&source=universe&countryCode=US&apikey=';
  
  searchBoxState: FormControl = new FormControl('');
  @Output() apiSearchResults = new EventEmitter();
  @Output() searchTermUpdated = new EventEmitter();
  subscription: Subscription;

  constructor(private http: HttpClient) {

  }

  private getSearchResults (val: any): Observable<any>  {
    console.log("val at service: ", val);
    return this.http.get<any>(this.apiPrefix + val + this.apiSuffix + API_KEY);
  }

  ngOnInit () {
      this.subscription = this.searchBoxState.valueChanges
        .pipe(
          debounceTime(700),
          distinctUntilChanged(),
          tap(text => this.searchTermUpdated.emit(text))
        )
        .pipe(
            mergeMap((data: any)=> {
              return this.getSearchResults(data);
            }),
        ).subscribe((results)=> {
          if(results._embedded?.events?.length > 0) {
            this.apiSearchResults.emit(results._embedded.events);
          } else {
            this.apiSearchResults.emit(null);
            console.log("no results! :(");
          }
        });
      
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }
}