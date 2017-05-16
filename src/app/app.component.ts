import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Landing } from '../pages/landing/landing';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { ItemDetails } from '../pages/item-details/item-details';
import { Wedding } from '../pages/wedding/wedding';
import { Trending } from '../pages/trending/trending';
import { Profile } from '../pages/profile/profile';
import { Favourites } from '../pages/favourites/favourites';
import { MyBag } from '../pages/my-bag/my-bag';
import { Purchased } from '../pages/purchased/purchased';
import { Search } from '../pages/search/search';
import { Settings } from '../pages/settings/settings';
import { EditProfile } from '../pages/edit-profile/edit-profile';
import { Order } from '../pages/order/order';
import { Hire } from '../hire/hire/order';
import { Storage } from '@ionic/storage';




@Component({
  templateUrl: 'app.html',
  providers:[
  
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Landing;
  userID
  pages: Array<{title: string, icon: string, count: string, component: any}>;

  constructor(public platform: Platform, public storage:Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Jude A', icon: 'contact', count:'', component: Profile },
      { title: 'Latest', icon: 'analytics',  count: '', component: Trending },
      { title: 'Search', icon: 'search',  count: '', component: Search },
      { title: 'Likes', icon: 'heart', count: '3', component: Favourites },
      { title: 'My Bag', icon: 'basket', count: '2', component: MyBag },
      { title: 'Purchased', icon: 'cart', count: '0', component: Purchased },
      { title: 'Settings', icon: 'settings', count: '', component: Settings }

    ];


    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      this.storage.get('userID').then((data)=>{this.userID = data;
         // console.log(this.userID)
          if(!this.userID){
              this.rootPage = Landing;
          }else{
              this.rootPage = Trending;
          } 
    
      });

      StatusBar.styleDefault();
      Splashscreen.show();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  ngOnInit() {
    /*
    this.storage.get('email').then((data)=>{
      if(data ===''){
        //this.navCtrl.push(Login);
        this.nav.setRoot(Login);
      }else{
        //this.navCtrl.push(Trending);
        //console.log(data)
        this.nav.setRoot(Trending);
      }
      
    });
    */
  }
}
