import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  private searchTerms = new Subject<string>();
  albums: any[] = [];

  constructor(private http: HttpClient) {
    this.searchTerms.pipe(
      debounceTime(500)
    ).subscribe(term => this.searchAlbums(term));
   
   }

   onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const term = input.value;
    this.searchTerms.next(term);
  }


  searchAlbums(term: string) {
    const url = `https://itunes.apple.com/search?term=${term}&media=music&entity=album&attribute=artistTerm&limit=50`;
    this.http.get<any>(url).subscribe(albums => this.albums = albums.results);
  }
  
  ngOnInit(): void {
  }

}
