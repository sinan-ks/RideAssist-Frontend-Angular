import { Component, Input, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms'
import { RideService } from '../services/ride.service';

@Component({
  selector: 'app-work-create',
  templateUrl: './work-create.component.html',
  styleUrls: ['./work-create.component.css']
})
export class WorkCreateComponent implements OnInit{

  @Input() custId:any

  workForm = new FormGroup({

    title: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    amount: new FormControl("", Validators.required)

  })

  constructor(private service:RideService){
    
  }

  ngOnInit(): void {
    console.log("Inside work create", this.custId);
    
  }

  handleSubmit(){
    let formData = this.workForm.value
    // console.log(formData);

    this.service.createWork(this.custId, formData).subscribe(data=>{
      console.log(data);

      this.service.refreshWorkList()

      // to reser form
      this.workForm.reset()
      
    })
    
  }

}
