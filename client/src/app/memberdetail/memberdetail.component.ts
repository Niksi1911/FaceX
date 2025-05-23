import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Members } from '../_models/members';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';


@Component({
  selector: 'app-memberdetail',
  standalone: true,
  imports: [TabsModule,GalleryModule],
  templateUrl: './memberdetail.component.html',
  styleUrl: './memberdetail.component.css'
})
export class MemberdetailComponent implements OnInit {

  private memberservice = inject(MembersService);
  private route = inject(ActivatedRoute);
  member?: Members;
  images: GalleryItem[] =[];

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    
    const username = this.route.snapshot.paramMap.get('username');
    if(!username)return;
    this.memberservice.getMember(username).subscribe({
      next: member =>{
        this.member = member;
        member.photos.map(p=>{
          this.images.push(new ImageItem({src: p.url,thumb:p.url}))
        })
      }
    })
  }


}
