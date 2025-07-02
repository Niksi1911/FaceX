import { Component, inject, OnInit } from '@angular/core';

import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Members } from '../../_models/members';
import { MemberMessagesComponent } from "../member-messages/member-messages.component";


@Component({
  selector: 'app-memberdetail',
  standalone: true,
  imports: [TabsModule, GalleryModule, MemberMessagesComponent],
  templateUrl: './memberdetail.component.html',
  styleUrl: './memberdetail.component.css'
})
export class MemberdetailComponent implements OnInit {

  private memberservice = inject(MembersService);
  private route = inject(ActivatedRoute);
  member?: Members;
  images: ImageItem[] =[];

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    const username = this.route.snapshot.paramMap.get('username');
    if(!username)return;
    this.memberservice.getMember(username).subscribe({
      next: member =>{
        this.member = member;
        this.images = member.photos.map(p => new ImageItem({src: p.url,thumb: p.url}))
      }
    })
  }


}
