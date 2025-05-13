import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule,RouterLink,RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
  
})
export class NavComponent {
  accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  router = inject(Router);
  model:any = {};

  login(){
    this.accountService.login(this.model).subscribe({
      next: response =>{
        console.log(response);
        this.router.navigate(['/wall']);
      },
      error: error =>{ 
        this.toastr.error(error.error);
        this.model = {};
      }
      

    });
  }

  logout(){
    this.accountService.logout();
    this.router.navigate(['']);
    this.model = {};   

  }
}
