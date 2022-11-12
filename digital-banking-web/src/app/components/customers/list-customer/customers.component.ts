import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { catchError, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customers: Observable<Array<Customer>>;
  errorMessage: string;
  searchFormGroup: FormGroup;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
    });

    this.handleSearchCustomers();
  }
  handleSearchCustomers() {
    let kw = this.searchFormGroup.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }
  handleDeleteCustomer(customer: Customer) {
    let conf = confirm('Are you sure ?');
    if (!conf) return;
    this.customerService.deleteCustomer(customer.id).subscribe({
      next: () => {
        this.customers = this.customers.pipe(
          map((data) => {
            let index = data.indexOf(customer);
            data.slice(index, 1);
            return data;
          })
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
