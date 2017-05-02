import { Component, Output, ElementRef, Renderer, ChangeDetectorRef, ViewChild, ViewChildren, AfterViewInit, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';



import { AuthRememberComponent } from './auth-remember.component';
import { AuthMessageComponent } from './auth-message.component';

import { User } from './auth-form.interface';

@Component({
  selector: 'auth-form',
  styles: [`
    .email { border-color: #9f72e6; }
  `],
  template: `
    <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <ng-content select="h3"></ng-content>
        <label>
          Email address
          <input type="email" name="email" ngModel #email>
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
  // Local Properties
  showMessage: boolean;

  @ViewChild('email') email: ElementRef;

  // Note: ViewChildren is only available inside of ngAfterViewInit()
  @ViewChildren(AuthMessageComponent) message: QueryList<AuthMessageComponent>;

  @ContentChildren(AuthRememberComponent) remember: QueryList<AuthRememberComponent>;

  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  // Constructor (Dependency Injections)
  constructor(
    private cd: ChangeDetectorRef,
    private renderer: Renderer
  ) { }

  // Lifecycle hooks
  // if you want to change data before view has been initialized, make sure you use ngAfterContentInit() instead of ngAfterViewInit()
  ngAfterViewInit() {

    // the idea behind the renderer is that it is PLATFORM AGNOSTIC -- Angular abstracts these things for you and implements them according to the platform or environment you are deploying them to
    this.renderer.setElementAttribute(this.email.nativeElement, 'placeholder', 'Enter your email address');
    this.renderer.setElementClass(this.email.nativeElement, 'email', true);
    this.renderer.invokeElementMethod(this.email.nativeElement, 'focus');

    // this.email.nativeElement.setAttribute('placeholder', 'Enter your email address');
    // this.email.nativeElement.classList.add('email');
    // this.email.nativeElement.focus();

    if (this.message) {
      // setTimeout(() => { // hacky solution for changing the view after it's been rendered -- not required in production
      this.message.forEach((message) => {
        message.days = 30;
      });
      // });
      this.cd.detectChanges();
    }
  }

  ngAfterContentInit() {
    if (this.remember) {
      this.remember.forEach((item) => {
        item.checked.subscribe((checked: boolean) => this.showMessage = checked);
      });
    }
  }


  // Methods 

  onSubmit(value: User) {
    this.submitted.emit(value);
  }

}
