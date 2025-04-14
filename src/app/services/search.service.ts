import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { ResourceInfo } from '../types/youtube/types';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }

  async search(query: string): Promise<ResourceInfo[]> {
    const result$ = this.httpClient.get<ResourceInfo[]>(`http://localhost:4200/api/search?q=${query}`);
    return await lastValueFrom(result$);
  }
}
