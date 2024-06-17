import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router'
import { RideService } from '../services/ride.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent {

  id:any
  customer:any

  constructor(private router:ActivatedRoute, private servie:RideService){

    this.servie.isAuthenticated()

    let id=this.router.snapshot.params["id"]

    this.servie.retrieveCustomer(id).subscribe(data=>{
      console.log(data)

    this.customer=data
      
    })

  }

}
