import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { WallComponent } from './wall/wall.component';
import { MemberdetailComponent } from './memberdetail/memberdetail.component';

export const routes: Routes = [
    {path:'',component:HomeComponent },
    {
        path:'',
        runGuardsAndResolvers:'always',
        children : [
            {path: 'wall',component:WallComponent},
            {path: 'list',component:ListComponent},
            {path: 'memberdetail/:username',component:MemberdetailComponent},
            {path: 'messages',component:MessagesComponent}
        ]
            
    
    }
];
