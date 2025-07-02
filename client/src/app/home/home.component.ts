import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from "../register/register.component";
import { WallComponent } from '../wall/wall.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
