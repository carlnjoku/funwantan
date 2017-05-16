import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
//import { Keyboard } from '@ionic-native/keyboard';

import {Http, Headers, RequestOptions} from '@angular/http';
import { Order } from '../../pages/order/order';

@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html'
})
export class Buy {

  public base64Image: string;
  private baseURI : string  = "http://www.arachost.com/funwantan/app/";

  userID  = '9';
  iphoto: string = this.navParams.get('iphoto');
  itemID = this.navParams.get('itemID');
  title = this.navParams.get('title');
  adminID = this.navParams.get('adminID');
  brandID = this.navParams.get('brandID');
  sale_price = this.navParams.get('sale_price');
  order_type = 'sale';
  
  overlayHidden: boolean = false;
  

  myForm: FormGroup;
  postInfo: any = {userID:this.userID, itemID: this.itemID, title: this.title, iphoto: this.iphoto, adminID: this.adminID, brandID: this.brandID, sale_price:this.sale_price, size:'', order_type:this.order_type};
  constructor(public formBuilder:FormBuilder, 
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl:ViewController,
              public http:Http
              ) {
                  this.myForm = this.formBuilder.group({
                    'userID': ['', [Validators.required]],
                    'itemID': ['', [Validators.required]],
                    'brandID': ['', [Validators.required]],
                    'sale_price': ['', [Validators.required]],
                    'size': ['', [Validators.required]],
                    'iphoto': ['', [Validators.required]],
                    'adminID': ['', [Validators.required]],
                    'title': ['', [Validators.required]],
                    'order_type': ['', [Validators.required]]
                  });
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyPage');
  }

  public hideOverlay() {
    this.overlayHidden = true;
    
    
  }

  closeBuyItem(){
      this.viewCtrl.dismiss();
  }

  isValid(field: string) {
        let formField = this.myForm.get(field);
        return formField.valid || formField.pristine;
  }

  closeOverlay(){
      this.viewCtrl.dismiss();
  }

   onSave(){
      //console.log(this.postInfo);
      var creds = "&item_photo=" + this.postInfo.iphoto + "&itemID=" + this.postInfo.itemID + "&adminID=" + this.postInfo.adminID + "&title=" + this.postInfo.title + "&userID=" + this.postInfo.userID + "&brandID=" + this.postInfo.brandID + "&size=" + this.postInfo.size + "&order_type=" + this.postInfo.order_type ;
      let body  = JSON.stringify(creds),
          type 	 : string	 = "application/x-www-form-urlencoded; charset=UTF-8",
          headers: any		 = new Headers({ 'Content-Type': type}),
          options: any 		 = new RequestOptions({ headers: headers }),
          url 	 : any		 = this.baseURI + "add_to_my_basket";
        
      this.http.post(url, body, options)
      .subscribe((data) =>
      {
         // If the save is successful redirect to payment page
         if(data.status === 200)
         {
             let data  = {'adminID':this.navParams.data.adminID,
                          'sale_price' : this.navParams.data.sale_price,
                          'brandID' : this.navParams.data.brandID,
                          'title' : this.navParams.data.title,
                          'itemID' : this.navParams.data.itemID,
                          'price' : this.navParams.data.sale_price,
                          'order_type' : 'Price For Sale'
                          
             };
             this.navCtrl.push(Order, data)
            
         }
         // Otherwise let 'em know soething went wrong
         else
         {
            //this.sendNotification('Yes something went wrong try again!');
         }
        
      });
   }

}
