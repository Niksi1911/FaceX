import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Members } from '../_models/members';

@Component({
  selector: 'app-memberdetail',
  standalone: true,
  imports: [],
  templateUrl: './memberdetail.component.html',
  styleUrl: './memberdetail.component.css'
})
export class MemberdetailComponent implements OnInit {

  ngOnInit(): void {
    this.loadMember();
  }

  private memberservice = inject(MembersService);
  private route = inject(ActivatedRoute);
  member?: Members;

  loadMember(){
    
    const username = this.route.snapshot.paramMap.get('username');
    if(!username)return;
    this.memberservice.getMember(username).subscribe({
      next: member =>this.member = member
    })
  }


}
