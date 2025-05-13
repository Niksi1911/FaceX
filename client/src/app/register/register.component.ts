import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private accountService = inject(AccountService);
  model: any = {}; 
  
  register(){
   this.accountService.register(this.model).subscribe({
    next : response => {
      this.router.navigate(['/wall']);
      console.log(response);
      
    },
    error: error => {
      console.error(error);
      this.toastr.error(error.error);
      this.model = {};
    }
   })

   
  }
}
