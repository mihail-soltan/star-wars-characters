import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  
  getCharacters(page: string): Observable<any> {
    return this.http.get(`https://swapi.dev/api/people/?page=${page}&format=json`)
  }

  searchCharacter(searchText: string): Observable<any> {
    return this.http.get(`https://swapi.dev/api/people/?search=${searchText}&format=json`)
  }
  }
