import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetails } from 'src/app/models/account.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private http: HttpClient) {}

  public getAccount(
    accountId: string | null = null,
    page: number,
    size: number
  ): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(
      environment.backendHost +
        '/accounts/' +
        accountId +
        '/pageOperations?page=' +
        page +
        '&size=' +
        size
    );
  }

  public debit(accountId: string, amount: number, description: string) {
    let data = {
      accountId,
      amount,
      description,
    };
    return this.http.post(environment.backendHost + '/accounts/debit', data);
  }

  public credit(accountId: string, amount: number, description: string) {
    let data = {
      accountId: accountId,
      amount: amount,
      description: description,
    };
    return this.http.post(environment.backendHost + '/accounts/credit', data);
  }

  public transfer(
    accountSource: string,
    accountDestination: string,
    amount: number,
    description: string
  ) {
    let data = {
      accountSource: accountSource,
      accountDestination: accountDestination,
      amount: amount,
      description: description,
    };
    return this.http.post(environment.backendHost + '/accounts/transfer', data);
  }
}
