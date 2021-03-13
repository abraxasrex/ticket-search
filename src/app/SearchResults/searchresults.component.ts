import { Component, OnInit, Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'search-results',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss']
})
export class SearchResultsComponent implements OnInit {
  displayVar = "boom";

  @Input() results;
  @Input() updatedSearches;
  @Input() noResultState;
  public displayNoResults;
  public resultsList = [];
  public recentSearches = [];

  pushResults (changedResult) {
    this.resultsList = changedResult || [];
  }

  pushRecentSearches (newSearchTerm) {
    this.recentSearches = newSearchTerm;
  }

  toggleNoResults (val) {
    this.displayNoResults = val;
  }

  ngOnInit () {
      console.log ("search results rendered!");
  }

  ngOnChanges (changes: SimpleChanges) {
    console.log("changed search results: ", changes);
      if(changes["results"]) {
          this.pushResults(changes["results"].currentValue);
      }
      if(changes["updatedSearches"]) {
        this.pushRecentSearches(changes["updatedSearches"].currentValue);
      }
      if(changes["noResultState"]) {
        this.toggleNoResults(changes["noResultState"].currentValue);
      }
  }
}