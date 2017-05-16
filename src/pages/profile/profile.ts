import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController,  ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EditProfile } from '../../pages/edit-profile/edit-profile';

import { MyApi} from '../../services/items';

import { Storage} from '@ionic/storage';

import {Http, Response} from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class Profile implements OnInit {

  // Base Url
  private baseURI : string  = 'http://www.arachost.com/funwantan/app/';

  //Set default segment button;
  seg_buttons: string = "sizing";
  user_id ;
  userDetails: any[];
  
  // Define Sizing list object
  heightList: any[];
  shirtList: any[];
  sleeveList: any[];
  neckList: any[];
  waistList: any[];
  pantList: any[];
  shoeList: any[];
  suitList: any[];
 
    
  firstname
  // Define sizing variables
  height : string;
  shirt
  sleeve
  neck
  waist
  pant
  shoe
  suit
  data
  
  //sizeForm: FormGroup;
  userInfo: any = {firstname:'', lastname:'', dob:'', occupation:'',category:'wedding', email: '', phone:'', password: ''};
  
  constructor(public modalCtrl: ModalController, private alertController: AlertController, public formBuilder:FormBuilder, public http:Http, public storage:Storage, public myApi:MyApi, public navCtrl: NavController, public navParams: NavParams) {

    // Create a size list for each sizing 
    this.heightList = [
    {
      options: [
        { text: 'Select Height', value: '1', parentVal: '' },
        { text: '5\' 0\" ', value: '50', parentVal: '' },
        { text: '5\' 1\" ', value: '51', parentVal: '' },
        { text: '5\' 2\" ', value: '52', parentVal: '' },
        { text: '5\' 3\" ', value: '53', parentVal: '' },
        { text: '5\' 4\" ', value: '54', parentVal: '' },
        { text: '5\' 5\" ', value: '55', parentVal: '' },
        { text: '5\' 6\" ', value: '56', parentVal: '' },
        { text: '5\' 7\" ', value: '57', parentVal: '' },
        { text: '5\' 8\" ', value: '58', parentVal: '' },
        { text: '5\' 9\" ', value: '59', parentVal: '' },
        { text: '5\' 10\" ', value: '510', parentVal: '' },
        { text: '5\' 11\" ', value: '50', parentVal: '' },
        { text: '6\' 0\" ', value: '60', parentVal: '' },
        { text: '6\' 1\" ', value: '61', parentVal: '' },
        { text: '6\' 2\" ', value: '62', parentVal: '' },
        { text: '6\' 3\" ', value: '63', parentVal: '' },
        { text: '6\' 4\" ', value: '64', parentVal: '' },
        { text: '6\' 5\" ', value: '65', parentVal: '' },
        { text: '6\' 6\" ', value: '66', parentVal: '' },
        { text: '6\' 7\" ', value: '67', parentVal: '' },
        { text: '6\' 8\" ', value: '68', parentVal: '' },
        { text: '6\' 9\" ', value: '69', parentVal: '' },
        { text: '6\' 10\" ', value: '610', parentVal: '' },
        { text: '6\' 11\" ', value: '611', parentVal: '' }
        
     
      ]
    }];

    this.shirtList = [
    {
      options: [
        { text: 'Select Height', value: '1', parentVal: '' },
        { text: 'S', value: 'S', parentVal: '' },
        { text: 'M', value: 'M', parentVal: '' },
        { text: 'L', value: 'L', parentVal: '' },
        { text: 'XL', value: 'XL', parentVal: '' },
        { text: 'XXL', value: 'XXL', parentVal: '' }
      ]
    }];

    this.sleeveList = [
    {
      options: [
        { text: 'Select Height', value: '1', parentVal: '' },
        { text: '28', value: '28', parentVal: '' },
        { text: '29', value: '29', parentVal: '' },
        { text: '30', value: '30', parentVal: '' },
        { text: '31', value: '31', parentVal: '' },
        { text: '32', value: '32', parentVal: '' },
        { text: '33', value: '33', parentVal: '' },
        { text: '34', value: '34', parentVal: '' },
        { text: '35', value: '35', parentVal: '' },
        { text: '36', value: '36', parentVal: '' },
        { text: '37', value: '37', parentVal: '' },
        { text: '38', value: '38', parentVal: '' },
        { text: '39', value: '39', parentVal: '' },
        { text: '40', value: '40', parentVal: '' }
      ]
    }];

    this.neckList = [
    {
      options: [
        { text: 'Select Height', value: '1', parentVal: '' },
        { text: '15', value: '15', parentVal: '' },
        { text: '15.5', value: '15.5', parentVal: '' },
        { text: '16', value: '16', parentVal: '' },
        { text: '16.5', value: '16.5', parentVal: '' },
        { text: '17', value: '17', parentVal: '' },
        { text: '17.5', value: '17.5', parentVal: '' },
        { text: '18', value: '18', parentVal: '' },
        { text: '18.5', value: '18.5', parentVal: '' },
        { text: '19', value: '19', parentVal: '' },
        { text: '19.5', value: '19.5', parentVal: '' },
        { text: '20', value: '20', parentVal: '' }
      ]
    }];

    this.waistList = [
    {
      options: [
        { text: 'Select Height', value: '1', parentVal: '' },
        { text: '28', value: '28', parentVal: '' },
        { text: '29', value: '29', parentVal: '' },
        { text: '30', value: '30', parentVal: '' },
        { text: '31', value: '31', parentVal: '' },
        { text: '32', value: '32', parentVal: '' },
        { text: '33', value: '33', parentVal: '' },
        { text: '34', value: '34', parentVal: '' },
        { text: '35', value: '35', parentVal: '' },
        { text: '36', value: '36', parentVal: '' },
        { text: '37', value: '37', parentVal: '' },
        { text: '38', value: '38', parentVal: '' },
        { text: '39', value: '39', parentVal: '' },
        { text: '40', value: '40', parentVal: '' }
      ]
    }];

    this.pantList = [
    {
      options: [
        { text: 'Select Height', value: '1', parentVal: '' },
        { text: '26', value: '26', parentVal: '' },
        { text: '28', value: '28', parentVal: '' },
        { text: '30', value: '30', parentVal: '' },
        { text: '32', value: '32', parentVal: '' },
        { text: '34', value: '34', parentVal: '' },
        { text: '36', value: '36', parentVal: '' },
        { text: '38', value: '38', parentVal: '' }
      ]
    }];

    this.shoeList = [
    {
      options: [
        { text: 'Select Height', value: '1', parentVal: '' },
        { text: '5', value: '5', parentVal: '' },
        { text: '2', value: '3', parentVal: '' },
        { text: '3', value: '4', parentVal: '' }
      ]
    }];

    this.suitList = [
    {
      options: [
        { text: 'Select Height', value: '1', parentVal: '' },
        { text: '5', value: '5', parentVal: '' },
        { text: '2', value: '3', parentVal: '' },
        { text: '3', value: '4', parentVal: '' }
      ]
    }];
    
  }

  
  ionViewDidLoad() {
    
    this.storage.get('userID').then((val)=>{
      this.user_id = val;
      console.log(val)
  });
    
    
    this.http.get('http://www.arachost.com/funwantan/app/get_user_details/9').map(res => res.json()).subscribe(data => {
        //console.log(this.firstname = data.response.firstname);
       this.userDetails = data;
       console.log(this.userDetails)
       

      for(let data of this.userDetails) {

          data.ht = data.height;
          data.sl = data.sleeve_size;
          data.st = data.shirt_size;
          data.nc = data.neck_size;
          data.wt = data.waist_size;
          data.se = data.shoe_size;
          data.pt = data.pant_inseam;
          data.su = data.suit;
      
          // Assign default value for sizing
          this.height = data.ht
          this.shirt = data.st
          this.sleeve = data.sl
          this.neck = data.nc
          this.waist = data.wt
          this.shoe = data.se
          this.pant = data.pt
          this.suit = data.su
          
      }

     
    });
    

    
  }

  editHeight() {
    console.log(this.height);
    var link = this.baseURI + "edit_user_height";
    //var link = 'http://www.arachost.com/funwantan/app/edit_user_height';
    var data = JSON.stringify({height:this.height, userID:'9'});
        
        this.http.post(link, data)
        .subscribe(data => {
         this.data = data;
         console.log(this.data)
        }, error => {
            console.log("Oooops!");
        });
    
  }


  editShirt() {
    console.log(this.shirt);
    
    var link = this.baseURI + "edit_user_shirt";
   // var link = 'http://www.arachost.com/funwantan/app/edit_user_shirt';
    var data = JSON.stringify({shirt:this.shirt, userID:'9'});
        
        this.http.post(link, data)
        .subscribe(data => {
         this.data = data;
         console.log(this.data)
        }, error => {
            console.log("Oooops!");
        });
    
  }

  editSleeve() {
    console.log(this.sleeve);
    
    var link = this.baseURI + "edit_user_sleeve";
    var data = JSON.stringify({sleeve:this.sleeve, userID:'9'});
        
        this.http.post(link, data)
        .subscribe(data => {
         this.data = data;
         console.log(this.data)
        }, error => {
            console.log("Oooops!");
        });
    
  }

  editNeck() {
    console.log(this.neck);
    
    var link = this.baseURI + "edit_user_neck";
    var data = JSON.stringify({neck:this.neck, userID:'9'});
        
        this.http.post(link, data)
        .subscribe(data => {
         this.data = data;
         console.log(this.data)
        }, error => {
            console.log("Oooops!");
        });
    
  }

  editWaist() {
    console.log(this.waist);
    
    var link = this.baseURI + "edit_user_waist";   
    var data = JSON.stringify({waist:this.waist, userID:'9'});
        
        this.http.post(link, data)
        .subscribe(data => {
         this.data = data;
         console.log(this.data)
        }, error => {
            console.log("Oooops!");
        });
    
  }

  editPantInseam() {
    console.log(this.pant);
    
    var link = this.baseURI + "edit_user_pant_inseam";   
    var data = JSON.stringify({pant:this.pant, userID:'9'});
        
        this.http.post(link, data)
        .subscribe(data => {
         this.data = data;
         console.log(this.data)
        }, error => {
            console.log("Oooops!");
        });
    
  }

  editShoe() {
    console.log(this.shoe);
    
    var link = this.baseURI + "edit_user_shoe";  
    var data = JSON.stringify({shoe:this.shoe, userID:'9'});
        
        this.http.post(link, data)
        .subscribe(data => {
         this.data = data;
         console.log(this.data)
        }, error => {
            console.log("Oooops!");
        });
    
  }

  editSuit() {
    console.log(this.suit);
    
    var link = this.baseURI + "edit_user_suit"; 
    var data = JSON.stringify({suit:this.suit, userID:'9'});
        
        this.http.post(link, data)
        .subscribe(data => {
         this.data = data;
         console.log(this.data)
        }, error => {
            console.log("Oooops!");
        });
    
  }

  goToEdit(){
    //this.userDetails = this.navParams.data;
    for(let data of this.userDetails) {
        data.uid = data.userID;
        data.fname = data.firstname;
        data.lname = data.lastname;
        data.em = data.email;
        data.doo = data.dob;
        data.cat = data.category;
        data.occ = data.occupation;
        data.phone = data.phone;
        //console.log(data.fname)

        let datas = {
                'user_id':data.uid,
                'firstname':data.fname,
                'lastname' : data.lname,
                'email' : data.em,
                'dob' : data.doo,
                'category' : data.cat,
                'occupation' : data.occ,
                'phone' : data.phone
                          
    };
    //this.navCtrl.push(EditProfile, data)
    let modal = this.modalCtrl.create(EditProfile, data);
    modal.present();

      }
    
  }

  
  ngOnInit(){
    
  }

}