import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Landing } from '../pages/landing/landing';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { ItemDetails } from '../pages/item-details/item-details';
import { ExpandedPics } from '../pages/expanded-pics/expanded-pics';
import { Request } from '../pages/request/request';
import { Trending } from '../pages/trending/trending';
import { Wedding } from '../pages/wedding/wedding';
import { Profile } from '../pages/profile/profile';
import { Favourites } from '../pages/favourites/favourites';
import { MyBag } from '../pages/my-bag/my-bag';
import { Purchased } from '../pages/purchased/purchased';
import { Search } from '../pages/search/search';
import { ReferAFriend } from '../pages/refer-a-friend/refer-a-friend';
import { Settings } from '../pages/settings/settings';
import { EditProfile } from '../pages/edit-profile/edit-profile';
import { Buy } from '../pages/buy/buy';
import { Order } from '../pages/order/order';
import { Hire } from '../pages/hire/hire';
import { MyApi } from '../services/items';
import { Storage } from '@ionic/storage';
//import { Keyboard } from '@ionic-native/keyboard';
import { MultiPickerModule } from 'ion-multi-picker';



@NgModule({
  declarations: [
    MyApp,
    Signup,
    Login,
    Landing,
    ItemDetails,
    Trending,
    Profile,
    Wedding,
    Purchased,
    MyBag,
    Favourites,
    Search,
    ReferAFriend,
    Settings,
    ExpandedPics,
    Request,
    Buy,
    Order,
    EditProfile,
    Hire
 
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    MultiPickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Landing,
    Login,
    Signup,
    ItemDetails,
    Trending,
    Wedding,
    Profile,
    Purchased,
    MyBag,
    Favourites,
    Search,
    ReferAFriend,
    Settings,
    ExpandedPics,
    Request,
    Buy,
    Order,
    EditProfile,
    Hire
  ],
  providers: [MyApi, Storage, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
