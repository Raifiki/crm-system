import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../../../models/user.class';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogTitle,
    MatProgressBarModule,
    MatDialogActions,
    MatDialogContent,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {

  loading = false;

  fbService = inject(FirebaseService);

  user: User;
  birthDate: Date = new Date();

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>){
    this.user = this.getUserData();
    this.birthDate.setTime(this.user.birthDate);
  }

  onNoClick(){
    this.dialogRef.close();
  }

  async saveUser(){
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    await this.fbService.updateUser(this.user.id,this.user.toJSON()).then(() => {
      this.loading = false;
      this.dialogRef.close();     
    });
  }

  getUserData(){
    return new User(this.fbService.user.toJSON(),this.fbService.user.id);
  }

}
