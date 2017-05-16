import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import {MyApi} from '../../services/items';
import * as _ from 'lodash';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class Search {

  allItems: any;
   items: any;
  queryText: string;

  searchTerm: string = '';

  searching: any = false;

 
  
  constructor(public http:Http, public myApi:MyApi, public navCtrl: NavController, public navParams: NavParams) {}

    ionViewDidLoad() {
      //this.setFilteredItems();
    }

    setFilteredItems() {
        this.searching = true;
        this.items = this.myApi.filterItems(this.searchTerm);
    }

}
