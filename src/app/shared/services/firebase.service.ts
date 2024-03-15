import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { User } from '../../../models/user.class';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);
  
  users: User[] = [];
  
  unsubUsers;
  
  constructor() { 
    this.unsubUsers = this.subUsers();
  }

  subUsers(){
    return onSnapshot(this.getUsersRef(),(users) => {
      this.users = [];
      users.forEach((user) => this.users.push(new User(user.data())));
      console.log('Users Data from server:',this.users);
    });
  }


  async addUser(user: {}){
    await addDoc(this.getUsersRef(),user).catch( (err) => {
      console.log('Error form FirebaseService:',err);
    }).then((newUser) => {
      console.log('New User added:',newUser?.id);
    });
  }

  getUsersRef(){
    return collection(this.firestore,'users');
  }

  ngonDestroy(){
    this.unsubUsers();
   }
}
