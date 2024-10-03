import { CharacterInterface } from './../interceptors/character.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {

  constructor(private http: HttpClient) {}

  getCharacters(page: number): Observable<{ results: CharacterInterface[] }> {
    return this.http.get<{ results: CharacterInterface[] }>(`${environment.linkApi}/character?page=${page}`);
  }

  searchCharacters(name: string): Observable<{ results: CharacterInterface[] }> {
    return this.http.get<{ results: CharacterInterface[] }>(`${environment.linkApi}/character?name=${name}`);
  }
}
