import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from "src/environments/environment";
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() setMainPhotoUrlEmitter = new EventEmitter<string>();
  currentMain: Photo;
  uploader: FileUploader;
  photoUrl:string;
  hasBaseDropZoneOver: boolean;
  response: string;
  baseUrl = environment.apiUrl;
  constructor(private authService: AuthService, private userService: UserService) { }

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



    }
  }
  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
      this.currentMain = this.photos.filter(p => p.isMain === true)[0];
      this.currentMain.isMain = false;
      photo.isMain=true;
      //this.setMainPhotoUrlEmitter.emit(photo.url);
      this.authService.changeMemberPhoto(photo.url);
      this.authService.currentUser.photoUrl=photo.url;
      localStorage.setItem('user',JSON.stringify(this.authService.currentUser));
    });

  }

}


 