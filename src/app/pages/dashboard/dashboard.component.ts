import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/auth/login.service';
import { User } from 'src/app/Services/auth/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  userLoginOn:boolean=false;
  userData?:User;

  constructor(private loginService:LoginService){}

  ngOnInit(): void {
      this.loginService.currentUserLoginOn.subscribe({
        next:(userLoginOn) =>{
          this.userLoginOn=userLoginOn;
        }
      });

      this.loginService.currentUserData.subscribe({
        next:(userData) =>{
          this.userData = userData;
        }
      })
  }

}
