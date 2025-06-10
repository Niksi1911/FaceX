import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { Members } from '../_models/members';
import { environment } from '../../environments/environment';
import { Photo } from '../_models/photo';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  baseUrl=environment.apiUrl;
  members = signal<Members[]>([]);
  

  getMembers(){
    return this.http.get<Members[]>(this.baseUrl+'users')
  }

  getMember(username:string){
    return this.http.get<Members>(this.baseUrl+'users/'+ username)
  }

  updateMember(member: Members){
    return this.http.put(this.baseUrl+'users',member)
  }

  updateMainPhoto(photo: Photo){
    return this.http.put(this.baseUrl+'users/set-main-photo/'+ photo.id,{}).pipe(
      tap(()=> {
        this.members.update(members => members.map(m => {
          if(m.photos.includes(photo)){
            m.photoUrl = photo.url
          }
          return m;
        }))
      })
    )
  }

   deletePhoto(photo : Photo){
    return this.http.delete(this.baseUrl +'users/delete-photo/'+photo.id).pipe(
      tap(()=>{
        this.members.update(members => members.map(m => {
          if(m.photos.includes(photo)){
            m.photos = m.photos.filter(x => x.id !== photo.id)
          }
          return m;
        }))
      })
    )

  }

}
