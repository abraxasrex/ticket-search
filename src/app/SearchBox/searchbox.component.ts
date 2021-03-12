import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'search-box',
  templateUrl: './searchbox.component.html'
})
export class SearchBoxComponent implements OnInit {

  displayVar = "boom";
  searchBoxState: FormControl = new FormControl('');

  constructor() {

  }

  ngOnInit () {
      console.log ("searchbox rendered!");
     // https://app.ticketmaster.com/discovery/v2/events.json?keyword=a&source=universe&countryCode=US&apikey=ZeNyd4289lf77eoEEWBBiMZkzhZl0mfY
      this.searchBoxState.valueChanges
        .pipe(debounceTime(600))
        .subscribe((text)=> {
            console.log(` final text: ${text}`)
      })
      
  }
}