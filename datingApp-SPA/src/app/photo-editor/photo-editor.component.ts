import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from "src/environments/environment";
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  response: string;
  baseUrl = environment.apiUrl;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initUploader();
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  initUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false

    });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      let photo: Photo = JSON.parse(response);
     this.photos.push(photo);
      console.log(photo);

    }
  }


}


