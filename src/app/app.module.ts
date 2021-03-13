import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import {SearchBoxComponent} from './SearchBox/searchbox.component';
import {SearchResultsComponent} from './SearchResults/searchresults.component';

@NgModule({
  declarations: [
    SearchBoxComponent,
    SearchResultsComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
