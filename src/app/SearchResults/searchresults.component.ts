import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search-results',
  templateUrl: './searchresults.component.html'
})
export class SearchResultsComponent implements OnInit {
  displayVar = "boom";

  ngOnInit () {
      console.log ("search results rendered!");
  }
}