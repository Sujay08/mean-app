import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AuthData } from "./auth-data.model";

@Injectable({providedIn: "root"})

export class AuthService{
    constructor(private http: HttpClient){}

    createUser(email: string, password: string){
        const authData: AuthData = {email: email, password: password};
        this.http.post("http://localhost:3000/api/users/signup", authData)
        .subscribe(res=>{
            console.log(res)
        },err=>{
            console.log(err);
        })
    }

}
