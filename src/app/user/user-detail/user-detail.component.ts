import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../shared/services/firebase.service';
import { User } from '../../../models/user.class';
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu'; 
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from './dialog-edit-address/dialog-edit-address.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  userId: string = '';
  user: User = new User();

  fbService = inject(FirebaseService);

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog){}

  async ngOnInit(){
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.fbService.subUser(this.userId);
  }

  getUser(){
    return this.fbService.user;
  }

  editUserDetails(){
    this.dialog.open(DialogEditUserComponent, {});
  }

  editMenu(){
    this.dialog.open(DialogEditAddressComponent, {});
  }
}
