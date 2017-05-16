import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Camera } from 'ionic-native';
import {Http, Headers, RequestOptions} from '@angular/http';

import 'rxjs/Rx';

import { Profile } from '../../pages/profile/profile';
import { Storage} from '@ionic/storage';


@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfile {

  public base64Image: string;
  private baseURI : string  = "http://www.arachost.com/funwantan/app/";
  
  userID ;
  //userID = this.navParams.get('user_id');
  firstname: string = this.navParams.get('firstname');
  lastname: string = this.navParams.get('lastname');
  email: string = this.navParams.get('email');
  phone: string = this.navParams.get('phone');
  //dob: string = this.navParams.get('dob');
  occupation: string = this.navParams.get('occupation');
  category: string = this.navParams.get('category');;


  today
  myForm: FormGroup;
  userInfo: any = {userID:this.userID, firstname:this.firstname, lastname:this.lastname, occupation:this.occupation,category:this.category, email: this.email, phone:this.phone};
  
  constructor(public storage:Storage,
              public navCtrl: NavController,
              public http:Http, 
              public navParams: NavParams, 
              public formBuilder: FormBuilder,
              public toastCtrl : ToastController,
              public viewCtrl:ViewController
              ) {

         

        this.myForm = this.formBuilder.group({
            'userID': ['', [Validators.required]],
            'email': ['', [Validators.required]],
            'firstname': ['', [Validators.required]],
            'lastname': ['', [Validators.required]],
            'phone': ['', [Validators.required]],
            //'dob': ['', [Validators.required]],
            'category': ['', [Validators.required]],
            'occupation': ['', [Validators.required]]
        });
  }

  ionViewDidLoad() {
      this.storage.get('userID').then((data) => {
        console.log(data);
        this.userID = data;
      })
      console.log(this.userID)
  }

  isValid(field: string) {
        let formField = this.myForm.get(field);
        return formField.valid || formField.pristine;
  }

  onSubmit()
   {
     console.log(this.userInfo);
     var creds = "&userID=" + this.userID + "&firstname=" + this.userInfo.firstname + "&lastname=" + this.userInfo.lastname + "&email=" + this.userInfo.email + "&phone=" + this.userInfo.phone + "&dob=" + this.userInfo.dob + "&category=" + this.userInfo.category + "&occupation=" + this.userInfo.occupation;
      let body  = JSON.stringify(creds),
          type 	 : string	 = "application/x-www-form-urlencoded; charset=UTF-8",
          headers: any		 = new Headers({ 'Content-Type': type}),
          options: any 		 = new RequestOptions({ headers: headers }),
          url 	 : any		 = this.baseURI + "edit_user";

      this.http.post(url, body, options)
      .subscribe((data) =>
      {
         
         // If the request was successful notify the user
         if(data.status === 200)
         {
            console.log(data); 
            this.navCtrl.push(Profile);
            //this.hideForm = true;
            this.sendNotification(`Congratulations the technology: ${name} was successfully added`);
            
            
         }
         // Otherwise let 'em know anyway
         else
         {
            this.sendNotification('Something went wrong!');
         }
      });
   }
   

   // Manage notifying the user of the outcome
   // of remote operations
   sendNotification(message)  : void
   {
      let notification = this.toastCtrl.create({
          message 		: message,
          duration 		: 3000
      });
      notification.present();
   }

  closeModal(){
      this.viewCtrl.dismiss();
    }


}
