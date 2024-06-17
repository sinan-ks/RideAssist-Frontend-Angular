import { Component } from '@angular/core';
import { RideService } from '../services/ride.service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  customers: any

  constructor(private service: RideService) {

    this.ngOnInit()

    this.service.isAuthenticated()

  }

  ngOnInit() {

    this.service.getCustomers().subscribe(data => this.customers = data)

  }

  handleDelete(id: any) {

    this.service.deleteCustomer(id).subscribe(data => {
      this.ngOnInit()

    })

  }

  generatePdf(id:any) {

    let customerDetail = this.customers.find((cust:any)=>cust.id==id)

    let body = []
    for(let work of customerDetail.works){
      body.push([work.title, work.description, work.amount])
    }

    const doc = new jsPDF()

    autoTable(doc, {
      head: [['Title', 'Description', 'Amount']],
      body: body,
    })

    doc.text('invoice', 20, 20)

    doc.save('table.pdf')
  }
  

}
