import { Component, inject, OnInit } from '@angular/core';
import { Members } from '../_models/members';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {

  member?: Members;
  private accountService = inject(AccountService);
  private membersService = inject(MembersService);

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    const user = this.accountService.currentUser();
    if(!user) return;
    this.membersService.getMember(user.username).subscribe({
      next: mem =>this.member = mem
    })
  }
}
