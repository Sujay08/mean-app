import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formData: any = {};

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  signUp(){
    this.authService.createUser(this.formData.email, this.formData.password);
  }

}
