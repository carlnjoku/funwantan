import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemDetails } from '../../pages/item-details/item-details';

import {MyApi} from '../../services/items';

import { Storage} from '@ionic/storage';


@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html'
})
export class Favourites {

items: any;
user_id = 9


 
  constructor(public storage:Storage, public navCtrl: NavController, public navParams: NavParams, private myApi: MyApi) {}

  ionViewDidLoad() {
      
      this.myApi.getLikes(this.user_id).then(data=> this.items = data);
      this.storage.get('userID').then((data)=>{
        this.user_id = data;
      });
  }

  itemTapped($event, item){
    this.navCtrl.push(ItemDetails, item);
  }

}
