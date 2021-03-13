import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ticket-search';

  public resultsList = [];
  public recentSearches = [];

  populateSearchResults (results) {
    this.resultsList = results;
  }

  populateRecentSearches (searchTerm) {
    if (this.recentSearches.length < 5) {
      this.recentSearches.push(searchTerm);
    } else {
      this.recentSearches.shift();
      this.recentSearches.push(searchTerm);
    }
  }
}
