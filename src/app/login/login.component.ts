import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms'
import { RideService } from '../services/ride.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({

    "username" : new FormControl("", Validators.required),
    "password" : new FormControl("", Validators.required)

  })

  constructor(private service:RideService, private route:Router){
    this.service.isAuthenticated()
  }

  handleSubmit(){

    let formData = this.loginForm.value
    // console.log(formData);
    this.service.getTokenPair(formData).subscribe(
      
    (data:any)=>{
      // console.log(data);
      localStorage.setItem("refresh", data.refresh)
      localStorage.setItem("access", data.access)

      this.service.isAuthenticated()

      this.route.navigateByUrl("customers")
      
    },
    (error:any)=>{
      alert("Failed to login")
    }
  
  )
    
  }

}
