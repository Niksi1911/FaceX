import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../_services/members.service';
import { Members } from '../_models/members';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  members: Members[] = [];
  private membersService = inject(MembersService)

   ngOnInit(): void {
   this.showMembers();
  }

  showMembers(){
    return this.membersService.getMembers().subscribe({
      next:response => this.members = response
    })
  }
}
