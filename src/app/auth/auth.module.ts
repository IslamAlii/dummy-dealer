import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, SharedModule],
})
export class AuthModule {}
