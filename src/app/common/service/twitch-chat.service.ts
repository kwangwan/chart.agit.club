import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Common } from './common';
import { environment } from 'src/environments/environment';
import { ITwitchChatInput, ITwitchChatBuzzOutput, ITwitchChatMessageOutput } from '../dao/twitch-chat';


@Injectable({
  providedIn: 'root'
})
export class TwitchChatService extends Common {

  url = environment.apiUrl;

  constructor(private http: HttpClient) {
    super();
  }

  async getTwitchChatBuzz(twitchChatInput: ITwitchChatInput): Promise<ITwitchChatBuzzOutput> {
    const url = `${this.url}/Chart/twitch_chat_buzz`;
    const response: ITwitchChatBuzzOutput = await lastValueFrom(this.http.post(url, twitchChatInput, this.header()));
    return response;
  }

  async getTwitchChatMessages(twitchChatInput: ITwitchChatInput): Promise<ITwitchChatMessageOutput> {
    const url = `${this.url}/Chart/twitch_chat_messages`;
    const response: ITwitchChatMessageOutput = await lastValueFrom(this.http.post(url, twitchChatInput, this.header()));
    return response;
  }

}
