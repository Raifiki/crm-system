import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../../../models/user.class';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FirebaseService } from '../../../shared/services/firebase.service';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatProgressBarModule,
    MatDialogActions,
    MatDialogContent,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  loading = false;

  fbService = inject(FirebaseService);

  user: User;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>){
    this.user = this.getUserData();
  }

  onNoClick(){
    this.dialogRef.close();
  }

  async saveAddress(){
      this.loading = true;
      console.log(this.user);
      await this.fbService.updateUser(this.user.id,this.user.toJSON()).then(() => {
        this.loading = false;
        this.dialogRef.close();     
      });
  }

  getUserData(){
    return new User(this.fbService.user.toJSON(),this.fbService.user.id);
  }

}
