import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { User } from '../../../models/user.class';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);
  user: User = new User();

  users: User[] = [];
  
  unsubUsers;
  unsubUser;
  
  constructor() { 
    this.unsubUsers = this.subUsers();
    this.unsubUser = this.subUser('test');
  }

  subUsers(){  
    return onSnapshot(this.getUsersRef(),(users) => {
      this.users = [];
      users.forEach((user) => {this.users.push(new User(user.data(),user.id))});
      console.log('Users Data from server:',this.users);      
    });
  }

  subUser(id:string){  
    return onSnapshot(this.getSingleDocRef(id),    
      (user) => {this.user = new User(user.data(),user.id);}
    );
  }


  async addUser(user: {}){
    await addDoc(this.getUsersRef(),user).catch( (err) => {
      console.log('Error from FirebaseService AddUSer:',err);
    }).then((newUser) => {
      console.log('New User added:',newUser?.id);
    });
  }


  async updateUser(id: string,user: {}){
    await updateDoc(this.getSingleDocRef(id), user).catch((err) => {
      console.log('Error from FirebaseService EditUser:',err);
    });
  }

  async deleteUser(id: string){
    await deleteDoc(this.getSingleDocRef(id)).catch((err) => {
      console.log('Error from FirebaseService deleteUser:',err);
    }).then(() => {
        this.unsubUser;
        console.log('user deleted and unsub with id:', id);
        this.user = new User();
    });
  }

  getUsersRef(){
    return collection(this.firestore,'users');
  }

  getSingleDocRef(docId: string){
    return doc(collection(this.firestore,'users'),docId);
  }

  ngonDestroy(){
    this.unsubUsers();
    this.unsubUser();
   }
}
