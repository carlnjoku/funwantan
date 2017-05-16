import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ExpandedPics } from '../../pages/expanded-pics/expanded-pics';
import { Request } from '../../pages/request/request';
import { Buy } from '../../pages/buy/buy';
import { Hire } from '../../pages/hire/hire';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetails {

  private baseURI : string  = 'http://www.arachost.com/funwantan/app/';
  likePostData
  userID
  details = [];

  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public http: Http,
              public modalCtrl: ModalController,
              public storage:Storage) {
                
                // Or to get a key/value pair
                storage.get('userID').then((data) => {
                  console.log(data);
                  this.userID = data;
                })
              }

  ionViewDidLoad() {
   console.log(this.details = this.navParams.data);
  }

  likeItem(){
    this.details = this.navParams.data;
    //var link = 'http://localhost/funwantan/app/edit_user_height';
     var url = this.baseURI + "like";
     var likePostData = JSON.stringify({itemID:this.navParams.data.itemID , userID:this.userID, like:'like'});
        
        this.http.post(url, likePostData)
        .subscribe(data => {
         this.likePostData = data;
         if(status==='ok'){
           console.log('good')
         }else{
           console.log('Error liking this item')
         }
         console.log(this.likePostData)
        }, error => {
            console.log("Oooops!");
        });

  }

  expandPics(){
    let data  = {'iphoto' : this.navParams.data.item_photo};
    console.log(data)
    let modal = this.modalCtrl.create(ExpandedPics, data);
      modal.present();
  }

  request(){
    let data  = {'userID':this.userID,
                  'itemID':this.navParams.data.itemID,
                  'adminID':this.navParams.data.adminID,
                  'admin_name':this.navParams.data.admin_name, 
                  'admin_photo':this.navParams.data.admin_photo, 
                  'iphoto' : this.navParams.data.item_photo};
    let modal = this.modalCtrl.create(Request, data);
      modal.present();
  }

  buyItem(){
    
    let data  = {'adminID':this.navParams.data.adminID,
                  'iphoto' : this.navParams.data.item_photo,
                  'sale_price' : this.navParams.data.sale_price,
                  'brandID' : this.navParams.data.brandID,
                  'title' : this.navParams.data.title,
                  'itemID' : this.navParams.data.itemID
                };
   

    let modal = this.modalCtrl.create(Buy, data);
      modal.present();
  }

  hireItem(){
    
    let data  = {'adminID':this.navParams.data.adminID,
                  'iphoto' : this.navParams.data.item_photo,
                  'sale_price' : this.navParams.data.sale_price,
                  'brandID' : this.navParams.data.brandID,
                  'title' : this.navParams.data.title,
                  'itemID' : this.navParams.data.itemID
                };
   

    let modal = this.modalCtrl.create(Hire, data);
      modal.present();
  }
    
  

}
