import { Injectable } from '@angular/core';
import { User } from '../models/userSignup.model';
import { Subject } from 'rxjs'
import firebase from 'firebase';



@Injectable()
export class AuthService {

  private users: User[] = [];
  userSubject = new Subject<User[]>();

  constructor() { }

  emitUsers() {
    this.userSubject.next(this.users);
  }

  createNewUser(user: User) {
    console.log(user);
    this.getUsers();
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.passWord).then(
          () => {
            if(this.users.length === 0){
              this.users[0] = user;
            }else{
              this.users.push(user)
            }
            this.saveUser();
            this.emitUsers();
            resolve("ok");
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  saveUser() {
    firebase.database().ref('/Users').set(this.users);
  }

  getUsers() {
    firebase.database().ref('/Users')
    .on('value', (data) => {
        this.users = data.val() ? data.val() : [];
        this.emitUsers();
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve("ok");
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }

}
