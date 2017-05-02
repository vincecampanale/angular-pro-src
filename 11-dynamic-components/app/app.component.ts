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
      <div #entry></div>
    </div>
  `
})
export class AppComponent implements AfterContentInit {

  component: ComponentRef<AuthFormComponent>;

  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver
  ) { }

  ngAfterContentInit() {
    // this.entry.createComponent(authFormFactory);
  }

  createComponent() {
    const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
    if (!this.component) { this.component = this.entry.createComponent(authFormFactory, 0) };
    this.component.instance.title = 'Create account';
    this.component.instance.submitted.subscribe(this.loginUser);
  }

  destroyComponent() {
    if (this.component) { 
      this.component.destroy(); 
      this.component = null;
    }
  }

  loginUser(user: User) {
    console.log('Login', user);
  }

}