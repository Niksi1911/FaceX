import { Component, inject, input } from '@angular/core';
import { Members } from '../../_models/members';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { AccountService } from '../../_services/account.service';


@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [NgIf,NgFor,NgStyle,NgClass,FileUploadModule],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent {
  private accountService = inject(AccountService);
  member = input.required<Members>();

  uploader?: FileUploader;
  hasBaseDropZoneOver = false
}
