import { Component } from '@angular/core';
import { User } from 'src/app/Services/auth/user';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user/user.service';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/Services/auth/login.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent {
[x: string]: any;
  errorMessage:String="";
  user?:User;
  userLoginOn:boolean=false;
  editMode:boolean=false;

  registerForm=this.formBuilder.group({
    id:[''],
    firstname:['', Validators.required],
    surname:['',Validators.required],
    address:['',Validators.required],
    contact:['',Validators.required]
  })

  constructor(private userService:UserService, private formBuilder:FormBuilder, private loginService:LoginService){
    this.userService.getUser(environment.userId).subscribe({
      next: (userData) => {
        this.user=userData;
        this.registerForm.controls.id.setValue(userData.id.toString());
        this.registerForm.controls.firstname.setValue( userData.firstname);
        this.registerForm.controls.surname.setValue( userData.surname);
        this.registerForm.controls.contact.setValue( userData.contact);
        this.registerForm.controls.address.setValue( userData.address);
      },
      error: (errordata) =>{
        this.errorMessage=errordata;
      },
      complete: ()=>{
        console.info("User Data OK");
      }
    })

    this.loginService.userLoginOn.subscribe({
      next:(userLoginOn) =>{
        this.userLoginOn = userLoginOn;
      }
    })
  }

  get firstname(){
    return this.registerForm.controls.firstname;
  }
  get surname(){
    return this.registerForm.controls.surname;
  }
  get contact(){
    return this.registerForm.controls.contact;
  }
  get address(){
    return this.registerForm.controls.address;
  }

  savePersonalDetailsData()
  {
    if (this.registerForm.valid)
    {
      this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
        next:() => {
          this.editMode=false;
          this.user=this.registerForm.value as unknown as User;
        },
        error:(errorData)=> console.error(errorData)
      })
    }
  }

}
