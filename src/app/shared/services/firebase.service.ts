import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);
  constructor() { }

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
}
