import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-expanded-pics',
  templateUrl: 'expanded-pics.html'
})
export class ExpandedPics {

    iphoto: string = this.navParams.get('iphoto');
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {}

    
    closeModal(){
      this.viewCtrl.dismiss();
    }

}
