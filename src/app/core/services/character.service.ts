import { CharacterInterface } from './../interceptors/character.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(page: number): Observable<{ results: CharacterInterface[] }> {
    return this.http.get<{ results: CharacterInterface[] }>(`${this.apiUrl}/?page=${page}`);
  }

  searchCharacters(name: string): Observable<{ results: CharacterInterface[] }> {
    return this.http.get<{ results: CharacterInterface[] }>(`${this.apiUrl}/?name=${name}`);
  }
}
