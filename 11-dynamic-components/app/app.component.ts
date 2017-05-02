import { Component, ComponentRef, OnInit, ViewContainerRef, ViewChild, AfterContentInit, ComponentFactoryResolver } from '@angular/core';

import { AuthFormComponent } from './auth-form/auth-form.component';

import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  styles: [`
    div { 
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 300px;
    }
    button { 
      display: block;
      width: 50%;
      margin-bottom: 30px;
    }
    button.create {
      background-color: blue;
    }
    button.destroy {
      background-color: red;
    }

  `],
  template: `
    <div #wrapper>
      <button (click)="createComponent()" class="create">
        Create
      </button>
      <button (click)="destroyComponent()" class="destroy">
        Destroy
      </button>
      <button (click)="moveComponent()" class="move">
        Move Component
      </button>
      <div #entry></div>
    </div>
  `
})
export class AppComponent implements AfterContentInit {

  createAccountComponent: ComponentRef<AuthFormComponent>;
  loginComponent: ComponentRef<AuthFormComponent>;

  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver
  ) { }

  ngAfterContentInit() {
    const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
    this.entry.createComponent(authFormFactory);
  }

  createComponent() {
    if (!this.createAccountComponent) {
      const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
      this.createAccountComponent = this.entry.createComponent(authFormFactory, 0);
      this.createAccountComponent.instance.title = 'Create account';
      this.createAccountComponent.instance.submitted.subscribe(this.loginUser);
    }
  }

  destroyComponent() {
    if (this.createAccountComponent) {
      this.createAccountComponent.destroy();
      this.createAccountComponent = null;
    }
  }

  moveComponent() {
    this.entry.move(this.createAccountComponent.hostView, 1);
  }

  loginUser(user: User) {
    console.log('Login', user);
  }

}