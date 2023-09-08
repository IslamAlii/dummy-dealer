import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UnAuthGuard } from '../core/guards/unauth.guard';

const routes: Routes = [
  { path: 'login', canActivate: [UnAuthGuard], component: LoginComponent },
  { path: 'signup', canActivate: [UnAuthGuard], component: SignupComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
