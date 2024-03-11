import { Component, inject } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'; 
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {provideNativeDateAdapter} from '@angular/material/core';
import { User } from '../../../models/user.class';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../shared/services/firebase.service';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatDialogClose,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {

  user = new User();
  birthDate: Date = {} as Date;

  loading: boolean = false;

  fbService = inject(FirebaseService);

  onNoClick(){}
  
  async saveUser(){
    this.user.birthDate = this.birthDate.getTime();
    this.loading = true;
    console.log(this.user);
    await this.fbService.addUser(this.user.toJSON()).then(() => {
      this.loading = false;      
    });
  }
}
