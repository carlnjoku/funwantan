import { Component, trigger, state, style, transition, animate, keyframes  } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, } from 'ionic-angular';
import {FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage'
import { Trending } from '../../pages/trending/trending';
import { Landing } from '../pages/landing/landing';

import {Http, Headers, RequestOptions} from '@angular/http';
import * as _ from 'lodash';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [
 
    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('1500ms ease-in-out')
      ])
    ]),
 
    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('700ms ease-in-out')
      ])
    ]),
 
    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('1500ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1}) 
        ]))
      ])
    ]),
 
    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})


export class Login {
  email
  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  
  userID;
  details: any[];


  userInfo: any = {email: '', password: ''};
  myForm: FormGroup;
  private baseURI : string  = "http://www.arachost.com/funwantan/app/";
  constructor(public toastCtrl : ToastController,public loadingCtrl: LoadingController,public http:Http, public storage:Storage, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) 
  {
    
   this.myForm = this.formBuilder.group({
            'email': ['', [Validators.required]],
            'password': ['', [Validators.required, this.passwordValidator.bind(this)]]
        });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  passwordValidator(control: FormControl): {[s: string]: boolean} {
        if (control.value !== '') {
            if (!control.value.match(/^(?=.*\d).{4,30}$/)) {
                return {invalidPassword: true};
            }
        }
    }

  isValid(field: string) {
        let formField = this.myForm.get(field);
        return formField.valid || formField.pristine;
  }

/*
  onLogin(){
    console.log(this.userInfo);
    this.storage.set('email', this.userInfo.email);
    this.storage.set('loginState', true);
    this.navCtrl.push(Trending);
  }
*/
  onLogin(){
     //console.log(this.postInfo);
     var creds = "&email=" + this.userInfo.email + "&password=" + this.userInfo.password  ;
      let body  = JSON.stringify(creds),
          type 	 : string	 = "application/x-www-form-urlencoded; charset=UTF-8",
          headers: any		 = new Headers({ 'Content-Type': type}),
          options: any 		 = new RequestOptions({ headers: headers }),
          url 	 : any		 = this.baseURI + "user_login";

      this.http.post(url, body, options)
      .subscribe((data) =>
      {
         // If the request was successful notify the user
         if(data.status == 200)
         {
            let loader = this.loadingCtrl.create({
            content: "Logging in...",
            duration: 3000
            });
            loader.present();

              // Use lodash to get the response object 
              var response = _(data['_body']).value();
              
              // Remove the square brackets
              var result = response.replace(/[\[\]']+/g,'');
              
              // Covert to an object
              var res = JSON.parse(result);
              
              // Get the userID
              var userid = res['userID'];
              
              // Store userID in storage
              this.storage.set('userID', userid);
              
            
            setTimeout(() => {
              
              this.navCtrl.setRoot(Trending);
            }, 3000);

            setTimeout(() => {
              loader.dismiss();
            }, 5000);
            
         }
         // Otherwise let 'em know soething went wrong
         else
         {
            this.sendNotification('Email or password is incorrect.');
         }
        
      });
   }

   sendNotification(message)  : void
   {
      let notification = this.toastCtrl.create({
          message 		: message,
          duration 		: 3000
      });
      notification.present();
   }

}
