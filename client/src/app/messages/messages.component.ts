import { Component, inject, NgModule, OnInit } from '@angular/core';
import { MessageService } from '../_services/message.service';
import { Message } from '../_models/message';
import { NgFor, NgIf } from '@angular/common';
import { CreateMessage } from '../_models/createMessage';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
  messageService = inject(MessageService);

  messages :Message[] = [];
  newMessage: CreateMessage = {
    reciverUsername: '',
    content: ''
  };


  ngOnInit(): void {
    this.loadMessages()
    this.createMessages()
  }

  loadMessages(){
    this.messageService.getMessages().subscribe({
      next: (res) =>this.messages = res
    })
  }

  createMessages(){
    this.messageService.createMessage(this.newMessage).subscribe({
      next: (response) => {
        this.newMessage = {
          reciverUsername:'',
          content: ''
        };
      }
    })
  }

  
}
