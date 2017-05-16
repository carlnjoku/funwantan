import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class MyApi {
    private apiEndpoint ='https://alarinna-webapp.firebaseio.com/';
    
    constructor(private http:Http){}

    getUsers(){
        return new Promise(resolve=>{
            this.http.get(`${this.apiEndpoint}/member.json`)
                .subscribe(res => resolve(res.json()));
        });
    }
}