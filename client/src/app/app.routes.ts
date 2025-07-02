import { Routes } from '@angular/router';
import { ListComponent } from './Member/list/list.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { WallComponent } from './wall/wall.component';
import { MemberdetailComponent } from './Member/memberdetail/memberdetail.component';
import { MemberEditComponent } from './Member/member-edit/member-edit.component';
import { RegisterComponent } from './register/register.component';


export const routes: Routes = [
    {path:'',component:HomeComponent },
    {
        path:'',
        runGuardsAndResolvers:'always',
        
        children : [
            
            {path: 'wall',component:WallComponent},
            {path: 'list',component:ListComponent},
            {path: 'memberdetail/:username',component:MemberdetailComponent},
            {path: 'member_edit',component:MemberEditComponent},
            {path: 'messages',component:MessagesComponent}
        ]
    }
];
