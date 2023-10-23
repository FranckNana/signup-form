import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sign-up-form';

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBxv_ICogZhXRpmjZfl62UMeJosXu-Q_lg",
      authDomain: "signup-form-2bf55.firebaseapp.com",
      projectId: "signup-form-2bf55",
      storageBucket: "signup-form-2bf55.appspot.com",
      messagingSenderId: "519639240063",
      appId: "1:519639240063:web:e4fcd599074f8dfeb71e4a",
      measurementId: "G-XL56HPYPV0"
    };

    firebase.initializeApp(firebaseConfig);
  }

}
