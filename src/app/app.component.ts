import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
   // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDfCCqwL4UCsbP6NhHt0B3iwxfV-k3_yFc",
    authDomain: "jta-instagram-clone-920d8.firebaseapp.com",
    databaseURL: "https://jta-instagram-clone-920d8.firebaseio.com",
    projectId: "jta-instagram-clone-920d8",
    storageBucket: "jta-instagram-clone-920d8.appspot.com",
    messagingSenderId: "521554823508",
    appId: "1:521554823508:web:a9aeaacc0e8ba1b65720c1",
    measurementId: "G-W7QPJ60HQZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  }
}
