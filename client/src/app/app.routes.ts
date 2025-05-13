import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { WallComponent } from './wall/wall.component';

export const routes: Routes = [
    {path:'',component:HomeComponent },
    {path:'wall',component:WallComponent},
    {path:'list',component:ListComponent},
    {path:'messages',component:MessagesComponent}
];
