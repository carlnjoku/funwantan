import { Component, ViewChild, ViewChildren } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, LoadingController, Item} from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Camera } from 'ionic-native';

import {Http, Headers, RequestOptions} from '@angular/http';

import 'rxjs/Rx';

import {MyApi} from '../../services/items';
import { Storage} from '@ionic/storage';

import { ItemDetails } from '../../pages/item-details/item-details';


@Component({
  selector: 'page-request',
  templateUrl: 'request.html'
})
export class Request {
  
  
  
  public base64Image: string;
  private baseURI : string  = "http://www.arachost.com/funwantan/app/";
  
  
  admin_photo: string = this.navParams.get('admin_photo');
  iphoto: string = this.navParams.get('iphoto');
  admin_name: string = this.navParams.get('admin_name');
  adminID: any = this.navParams.get('adminID');
  itemID: any = this.navParams.get('itemID');
  userID: any = this.navParams.get('userID');
  //userID ;
  
  imgSrc : any;

  myForm: FormGroup;
  postInfo: any = {itemid:this.itemID, item_photo:this.iphoto, userID:this.userID, avatar:'user.png', user_type:'chat-photo-user', bubble:'right-top', admin_id:this.adminID, admin_name:this.admin_name, request:''};


  messages: any;
  newPost = [];
  
  
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http:Http, 
              public viewCtrl:ViewController,
              public formBuilder:FormBuilder,
              public toastCtrl : ToastController,
              public loadingCtrl: LoadingController,
              public storage: Storage,
              public myApi: MyApi) {

                this.myForm = this.formBuilder.group({
                  'itemid': ['', [Validators.required]],
                  'item_photo': ['', [Validators.required]],
                  'admin_name': ['', [Validators.required]],
                  'request': ['', [Validators.required]],
                  'userID': ['', [Validators.required]],
                  'user_type': ['', [Validators.required]],
                  'bubble': ['', [Validators.required]],
                  'avatar': ['', [Validators.required]],
                  'adminID': ['', [Validators.required]]
                  
                });

              
                
              }

  
  ionViewDidLoad() {
        
       this.storage.get('userID').then((data)=>{
          this.userID = data;
          
          var uid = this.userID;
          this.myApi.getMessages(uid).then(data=> this.messages = data);
        });
    
  }

  
  closeModal(){
      this.viewCtrl.dismiss();
  }

  closeImg(){
     this.viewCtrl.dismiss();
  }

  /*
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
  */

  

   onSubmit(){
      //console.log(this.postInfo);
      var creds = "&itemid=" + this.postInfo.itemid + "&item_photo=" + this.postInfo.item_photo + "&request=" + this.postInfo.request + "&adminID=" + this.postInfo.admin_id + "&admin_name=" + this.postInfo.admin_name + "&userID=" + this.postInfo.userID + "&bubble=" + this.postInfo.bubble + "&avatar=" + this.postInfo.avatar + "&user_type=" + this.postInfo.user_type ;
      let body  = JSON.stringify(creds),
          type 	 : string	 = "application/x-www-form-urlencoded; charset=UTF-8",
          headers: any		 = new Headers({ 'Content-Type': type}),
          options: any 		 = new RequestOptions({ headers: headers }),
          url 	 : any		 = this.baseURI + "request";
        
      this.http.post(url, body, options)
      .subscribe((data) =>
      {
         // If the request was successful notify the user
         if(data.status === 200)
         {
            let loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
            });
            loader.present();
            
            let uid = this.userID
            setTimeout(() => {
              
                this.myApi.getMessages(uid).then(data=> this.messages = data);
        
            }, 3000);

            setTimeout(() => {
              loader.dismiss();
            }, 5000);
            
         }
         // Otherwise let 'em know soething went wrong
         else
         {
            this.sendNotification('Yes something went wrong try again!');
         }
        
      });
   }

   isValid(field: string) {
        let formField = this.myForm.get(field);
        return formField.valid || formField.pristine;
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





}
