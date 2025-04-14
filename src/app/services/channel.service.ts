import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChannelInfo } from '../types/youtube/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private httpClient: HttpClient) { }

  getChannel(channelId: string): Observable<ChannelInfo> {
    return this.httpClient.get<ChannelInfo>(`http://localhost:4200/api/channel?id=${channelId}`)
  }
}
