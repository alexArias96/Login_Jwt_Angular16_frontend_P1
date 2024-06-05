import { Component } from '@angular/core';
import { User } from 'src/app/Services/auth/user';
import { UserService } from 'src/app/Services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent {
  errorMessage:String="";
  user?:User;

  constructor(private userService:UserService){
    this.userService.getUser(environment.userId).subscribe({
      next:(userData) =>{
        this.user=userData;
      },
      error: (errordata) =>{
        this.errorMessage=errordata;
      },
      complete: ()=>{
        console.info("User Data OK");
      }
    })
  }
}
