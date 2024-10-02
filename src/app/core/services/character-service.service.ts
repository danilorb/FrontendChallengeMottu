import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/?page=${page}`);
  }

  searchCharacters(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/?name=${name}`);
  }
}
