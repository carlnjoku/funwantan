import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MyApi {
    //private itemsEndpoint ='http://localhost/funwantan/app';
    private itemsEndpoint ='http://www.arachost.com/funwantan/app';

    itemDetails: any = {};
    userDetails: any ={};
    itemID
    
    items: any;
    
    
    constructor(private http:Http){
       /* 
        this.items = [
            {title: 'one'},
            {title: 'two'},
            {title: 'three'},
            {title: 'four'},
            {title: 'five'},
            {title: 'six'}
        ]
        */
        this.http.get(`${this.itemsEndpoint}/get_latest_items`).map(res => res.json()).subscribe(data => {
            this.items = data;
            console.log(data)
        });
        
        /*
        this.http.get('http://localhost/funwantan/app/get_latest_items').map(res => res.json()).subscribe(data => {
            this.items = data;
            console.log(data)
        });
        */
 
    }

    

    filterItems(searchTerm){
 
        return this.items.filter((item) => {
            return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });     
 
    }

    getLatestItems(){
        return new Promise(resolve=>{
            this.http.get(`${this.itemsEndpoint}/get_latest_items`)
                .subscribe(res => resolve(res.json()));
        });
    }

    getLikes(userID){
        return new Promise(resolve=>{
            this.http.get(`${this.itemsEndpoint}/get_likes/${userID}`)
                .subscribe(res => resolve(res.json()));
        });
    }
    getMessages(userID){
        return new Promise(resolve=>{
            this.http.get(`${this.itemsEndpoint}/get_messages/${userID}`)
                .subscribe(res => resolve(res.json()));
        });
    }
    
    getItems(){
        return new Promise(resolve=>{
            this.http.get(`${this.itemsEndpoint}/items`)
                .subscribe(res => resolve(res.json()));
        });
    }


    getUserDetails(user_id) : Observable <any> {
        return this.http.get(`${this.itemsEndpoint}/get_user_details/${user_id}`)
            .map(response => {
                this.userDetails = response.json;
                return this.userDetails;
            })
    }

    getUserD(){
        return this.userDetails;
    }

    
    /*
    getUserDetails(user_id){
        return new Promise(resolve=>{
            this.http.get(`${this.itemsEndpoint}/get_user_details/${user_id}`)
                .subscribe(res => resolve(res.json()));
            });
        }
    */
    /*
    getItemDetails(itemID) : Observable <any> {
        return this.http.get(`${this.itemsEndpoint}/get_item_details/${itemID}`)
            .map(response => {
                this.itemDetails = response.json;
                return this.itemDetails;
            })
    }
    */

}

