import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog'; 
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table'; 
import { FirebaseService } from '../shared/services/firebase.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})



export class UserComponent {

  user = new User();

  fbservice = inject(FirebaseService);

  displayedColumns: string[] = ['firstname', 'eMail', 'city'];
  
  constructor(public dialog: MatDialog){};

  openAddUserDialog(){
    const dialogRef = this.dialog.open(DialogAddUserComponent, {});    
  }

  getUsers(){
    return this.fbservice.users;
  }

  openCustomerDetails(row:any){
    console.log(row.id);
  }

}
