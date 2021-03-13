import { TestBed, fakeAsync, tick, flush} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {SearchResultsComponent} from './SearchResults/searchresults.component';
import {SearchBoxComponent} from './SearchBox/searchbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        SearchResultsComponent,
        SearchBoxComponent
      ],
      providers: [
        HttpClientModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ticket-search'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ticket-search');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.headliner').textContent)
      .toContain('your gateway to visualizing the Ticketmaster API');
  });

  // WIP  tests //
  // it('should make a test API call and render at least one result', fakeAsync(()=> {

  //   const p = new Promise((resolve, reject) => setTimeout(() => resolve(`done`), 1000));

  //   const fixture = TestBed.createComponent(AppComponent);
  //   const component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   tick();

  //   // const hostElement = fixture.nativeElement;
  //   fixture.debugElement.query(By.css('#theid'));
  //   const searchInput = fixture.debugElement.query(By.css('#search-input')).nativeElement;

  //   searchInput.value = "light";
  //   searchInput.dispatchEvent(new Event('input'));

  //   tick(200);
  //   flush();
  //   fixture.detectChanges();
  //   // wait for API to react to event
  //   expect(component.resultsList.length).toBeGreaterThan(0);

  // }));
});
