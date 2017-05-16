import { Component } from '@angular/core';
import { Trending } from '../../pages/trending/trending';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Camera } from 'ionic-native';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class Signup {
  
  
  public base64Image: string;
  private baseURI : string  = "http://www.arachost.com/funwantan/app/";
 
  today
  myForm: FormGroup;
  userInfo: any = {firstname:'', lastname:'', dob:'', occupation:'',category:'wedding', email: '', phone:'', password: ''};
  constructor(
        public navCtrl: NavController, 
        public http:Http, 
        public navParams: NavParams, 
        public formBuilder: FormBuilder,
        public toastCtrl : ToastController) {

        this.myForm = this.formBuilder.group({
            'email': ['', [Validators.required]],
            'firstname': ['', [Validators.required]],
            'lastname': ['', [Validators.required]],
            'phone': ['', [Validators.required]],
            'dob': ['', [Validators.required]],
            'category': ['', [Validators.required]],
            'occupation': ['', [Validators.required]],
            'password': ['', [Validators.required, this.passwordValidator.bind(this)]]
        });

        this.today = 'Date of Birth';
        

 }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
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

    //onSubmit() {
        //console.log(this.userInfo);
   // }

  onSubmit()
   {
     console.log(this.userInfo);
     var creds = "&firstname=" + this.userInfo.firstname + "&lastname=" + this.userInfo.lastname + "&email=" + this.userInfo.email + "&phone=" + this.userInfo.phone + "&dob=" + this.userInfo.dob + "&category=" + this.userInfo.category + "&occupation=" + this.userInfo.occupation+ "&password=" + this.userInfo.password;
      let body  = JSON.stringify(creds),
          type 	 : string	 = "application/x-www-form-urlencoded; charset=UTF-8",
          headers: any		 = new Headers({ 'Content-Type': type}),
          options: any 		 = new RequestOptions({ headers: headers }),
          url 	 : any		 = this.baseURI + "add_user";

      this.http.post(url, body, options)
      .subscribe((data) =>
      {
         
         // If the request was successful notify the user
         if(data.status === 200)
         {
            console.log(data); 
            this.navCtrl.push(Trending);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}

