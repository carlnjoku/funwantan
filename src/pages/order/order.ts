import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, LoadingController, Item} from 'ionic-angular';


@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class Order {

  masks: any;
  userID = '9';
  title: any = this.navParams.get('title');
  order_type: string = this.navParams.get('order_type');
  price: any = this.navParams.get('price');
  itemID: any = this.navParams.get('itemID');
  firtsName: any = '';
  lastName: any = ""
  phoneNumber: any = "";
  cardNumber: any = "";
  cardExpiry: any = "";
  orderCode: any = "";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl : ToastController,
              public loadingCtrl: LoadingController,
              ) {
      this.masks = {
            firstName: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
            lastName: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
            phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
            cardNumber: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
            cardExpiry: [/[0-1]/, /\d/, '/', /[1-2]/, /\d/],
            orderCode: [/[a-zA-z]/, ':', /\d/, /\d/, /\d/, /\d/]
        };
  }
  

  save(){
 
        let unmaskedData = {
            firtsName: this.firtsName.replace(/\D+/g, ''),
            lastName: this.lastName.replace(/\D+/g, ''),
            phoneNumber: this.phoneNumber.replace(/\D+/g, ''),
            cardNumber: this.cardNumber.replace(/\D+/g, ''),
            cardExpiry: this.cardExpiry.replace(/\D+/g, ''),
            orderCode: this.orderCode.replace(/[^a-zA-Z0-9 -]/g, '')
        };
 
        console.log(unmaskedData);

            let loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
            });
            loader.present();

            setTimeout(() => {
              //this.myApi.getMessages().then(data=> this.messages = data);
            }, 3000);

            setTimeout(() => {
              loader.dismiss();
            }, 5000);
 
    }
 

}
