import { Component, inject, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { effect } from '@angular/core';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnChanges {
  messageService = inject(MessageService);

  username = input<string>();
  messages: Message[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['username'] && this.username()) {
      this.loadMessages();
    }
  }

  loadMessages(){
    const username = this.username();
    if(username ==null){
      console.log("nemam username ode")
      return
    };

    this.messageService.getMessageThread(username).subscribe({
      next: response => this.messages = response
    })
  }

  

}
