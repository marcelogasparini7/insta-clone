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
    apiKey: "AIzaSyD5ziaLX3FbnI-b1i7n61zPzWCRgUh-EZs",
    authDomain: "jta-insta-clone-44a6d.firebaseapp.com",
    databaseURL: "https://jta-insta-clone-44a6d.firebaseio.com",
    projectId: "jta-insta-clone-44a6d",
    storageBucket: "jta-insta-clone-44a6d.appspot.com",
    messagingSenderId: "550991098307",
    appId: "1:550991098307:web:e46cefc25e9f73ede70d76",
    measurementId: "G-8Z76P2P76N"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  }
}
