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
  public resultsList = [];
  public recentSearches = [];

  pushResults (changedResult) {
    this.resultsList = changedResult || [];
  }

  pushRecentSearches (newSearchTerm) {
    // if (this.recentSearches.length < 5) {
    //   this.recentSearches.push(newSearchTerm);
    // } else {
    //   this.recentSearches.shift();
    //   this.recentSearches.push(newSearchTerm);
    // }
    this.recentSearches = newSearchTerm;
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
  }
}