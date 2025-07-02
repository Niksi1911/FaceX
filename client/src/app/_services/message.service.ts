import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Message } from '../_models/message';
import { CreateMessage } from '../_models/createMessage';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  messages: Message[] = [];
  createMessageform: Message[] = [];

  getMessages() {
    return this.http.get<Message[]>(this.baseUrl + 'messages')
  }

  createMessage(createMessageform: CreateMessage) {
    return this.http.post<Message>(this.baseUrl + 'messages', createMessageform)
  }

  getMessageThread(username: string){
    return this.http.get<Message[]>(this.baseUrl + 'messages/thread/'+username)
  }

  loadMessages() {
    this.getMessages().subscribe({
      next: (res) => this.messages = res
    });
  }

  

}


