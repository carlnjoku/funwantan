import { Component, trigger, state, style, transition, animate, keyframes   } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Login } from '../../pages/login/login';
import { Signup } from '../../pages/signup/signup';


@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',

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
        animate('1000ms 3000ms ease-in')
      ])
    ]),
    
   //For login button
    trigger('fadeIn2', [
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
export class Landing {

  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  formState2: any = "in";

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  animateToLogin(){
    this.navCtrl.push(Login, {}, {animate:true, direction:'forward'})
  }
  animateToSignup(){
    this.navCtrl.push(Signup, {}, {animate:true, direction:'forward'})
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

}
