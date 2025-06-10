import { Component, inject, input, OnInit, output } from '@angular/core';
import { Members } from '../../_models/members';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { AccountService } from '../../_services/account.service';
import { environment } from '../../../environments/environment';
import { MembersService } from '../../_services/members.service';
import { Photo } from '../../_models/photo';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [NgIf,NgFor,NgStyle,NgClass,FileUploadModule,DecimalPipe],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit {
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toastr = inject(ToastrService);

  member = input.required<Members>();

  uploader?: FileUploader;
  hasBaseDropZoneOver = false
  baseUrl = environment.apiUrl;
  memberChange = output<Members>();


  ngOnInit(): void {
    this.initializeUploader();
  }

  setMainImage(photo: Photo){
    this.memberService.updateMainPhoto(photo).subscribe({
     next: _ =>{
      const user = this.accountService.currentUser();
      if (user) {
        user.photoUrl = photo.url;
        this.accountService.currentUser.set(user);
      }

      const updateMember = {...this.member()}
      updateMember.photoUrl = photo.url;
      updateMember.photos.forEach(p =>{
        if(p.isMain) p.isMain = false;
        if(p.id ===photo.id) p.isMain = true;
        
      });

      this.memberChange.emit(updateMember);
      this.toastr.success("Main Image has been Updated") 
     },

     error: () => {
      this.toastr.error("Main photo didnt CHANGE !")
     }
    })
  }


  fileOverBase(event :any){
    this.hasBaseDropZoneOver = event;
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url:this.baseUrl +'users/add-photo',
      authToken: 'Bearer ' + this.accountService.currentUser()?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 *1024*1024,
    });

    this.uploader.onAfterAddingFile = (file) =>{
      file.withCredentials = false;
    }
    
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      const photo = JSON.parse(response);
      const updatedMember = {...this.member()}
      updatedMember.photos.push(photo);
      this.memberChange.emit(updatedMember);
      
    }


  }

  deletePhoto(photo : Photo){
    this.memberService.deletePhoto(photo).subscribe({
      next:() =>{
        const updatedMember = {...this.member()}
        updatedMember.photos = updatedMember.photos.filter(x => x.id !== photo.id);
         this.memberChange.emit(updatedMember);
      }
    })
  }

 
}

