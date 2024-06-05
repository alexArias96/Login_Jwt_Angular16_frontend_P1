import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/auth/login.service';
import { LoginRequest } from 'src/app/Services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginError:string='';

  loginForm = this.formBuilder.group({
    username:['', [Validators.required, Validators.email]],
    password:['', Validators.required]
  })

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginService){}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  get email(){
    return this.loginForm.controls.username;
  }

  get password(){
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
        //console.log("Call to login service");
        this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
          next:(userData) =>{
            console.log(userData);
          },
          error: (errorData) =>{
            console.error(errorData);
            this.loginError=errorData;
          },
          complete: ()=>{
            console.info("Login Complete");
            this.router.navigateByUrl('/inicio');
            this.loginForm.reset
          }
        });

    }else{
      this.loginForm.markAllAsTouched();
      alert("Error when entering data");
    }
  }
}
