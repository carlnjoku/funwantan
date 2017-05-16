import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetails } from '../../pages/item-details/item-details';

import {MyApi} from '../../services/items';

import { Storage} from '@ionic/storage';

@Component({
  selector: 'page-trending',
  templateUrl: 'trending.html'
})
export class Trending {

userID ;

items: any;


  constructor(public storage:Storage, public navCtrl: NavController, public navParams: NavParams, private myApi: MyApi) {}

  ionViewDidLoad() {
    // Get userID fro storage
    this.storage.get('userID').then((data)=>{
      this.userID = data;
    })
    
    // Get the list of latest items
    this.myApi.getLatestItems().then(data=> this.items = data);
  }

  itemTapped($event, item){
    this.navCtrl.push(ItemDetails, item);
  }
  
  removeVar()
  {
    this.storage.remove('userID')
  }
  
}
