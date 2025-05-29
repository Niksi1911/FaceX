import { Component, inject, OnInit } from '@angular/core';
import { Members } from '../_models/members';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule,FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {

  member: any;
  private accountService = inject(AccountService);
  private membersService = inject(MembersService);
  private toastr = inject(ToastrService);

  city: string = "";
  description : string = "";
  country: string = "";

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    const user = this.accountService.currentUser();
    if(!user) return;
    this.membersService.getMember(user.username).subscribe({
      next: mem => {
        this.member = mem;
        this.city = mem.city;
        this.country = mem.country;
        this.description = mem.description;
      }
    })
  }

  editProfile(){
    this.member.city = this.city;
    this.member.country = this.country;
    this.member.description = this.description;

    this.membersService.updateMember(this.member).subscribe({
      next:() => {
        this.toastr.success("Profile updated successfuly")
        
      },
      error:error => this.toastr.error("Failed to update profile")
    })
  }
}
