import { Component, Output, ViewChild, AfterViewInit, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

import { AuthRememberComponent } from './auth-remember.component';
import { AuthMessageComponent } from './auth-message.component';

import { User } from './auth-form.interface';

@Component({
  selector: 'auth-form',
  template: `
    <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <ng-content select="h3"></ng-content>
        <label>
          Email address
          <input type="email" name="email" ngModel>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel>
        </label>
        <ng-content select="auth-remember"></ng-content>
        <auth-message [style.display]="(showMessage ? 'inherit' : 'none')"></auth-message>
        <ng-content select="button"></ng-content>
      </form>
    </div>
  `
})
export class AuthFormComponent implements AfterContentInit {

  showMessage: boolean;

  @ViewChild(AuthMessageComponent) message: AuthMessageComponent

  @ContentChildren(AuthRememberComponent) remember: QueryList<AuthRememberComponent>;

  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  // if you want to change data before view has been initialized, make sure you use ngAfterContentInit() instead of ngAfterViewInit()
  ngAfterViewInit() {
    // console.log(this.message);
  }

  ngAfterContentInit() {
    if (this.message) {
      this.message.days = 30;
    }
    if (this.remember) {
      this.remember.forEach((item) => {
        item.checked.subscribe((checked: boolean) => this.showMessage = checked);
      });
    }
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }

}
