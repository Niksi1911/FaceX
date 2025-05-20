import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Members } from '../_models/members';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  baseUrl=environment.apiUrl;
  

  getMembers(){
    return this.http.get<Members[]>(this.baseUrl+'users')
  }

  getMember(username:string){
    return this.http.get<Members>(this.baseUrl+'users/'+ username)
  }

}
