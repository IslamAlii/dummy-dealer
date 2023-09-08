import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { userRegisterSentData } from 'src/app/interfaces/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  isSpinning: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  navigateToLogin() {
    this.router.navigate(['login']);
  }

  registerNewAccount(form1: NgForm, form2: NgForm) {
    this.isSpinning = true;

    const userModel: userRegisterSentData = {
      name: form1.value.firstName + ' ' + form1.value.lastName,
      email: form1.value.email,
      phone: form1.value.phoneNumber,
      password: form1.value.password,
      role: form1.value.userType,
      address: form2.value.address,
      status: 'active',
      photo: '',
      whatsapp_num: form2.value.whatsappNumber,
      payment_method: form2.value.EWallet,
      facebook: form2.value.facebookLink,
      website: form2.value.personalWebsiteLink,
      payment_method_number: '',
    };

    this.authService.userRegister(userModel).subscribe({
      next: (res) => {
        console.log(res);
        this.isSpinning = false;
        this.toastr.success('تم انشاء الحساب بنجاح', 'انشاء حساب');
        this.router.navigate(['login']);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        if (error.error.message.includes('duplicate email entered')) {
          Swal.fire({
            icon: 'error',
            title: 'خطأ في انشاء الحساب',
            text: 'هذا البريد الالكتروني لدية حساب بالفعل!',
          });
        } else if (error.error.message.includes('duplicate phone entered')) {
          Swal.fire({
            icon: 'error',
            title: 'خطأ في انشاء الحساب',
            text: 'هذا الرقم لدية حساب بالموقع بالفعل!',
          });
        } else if (
          error.error.message.includes('phone: Phone number is invalid')
        ) {
          Swal.fire({
            icon: 'error',
            title: 'خطأ في انشاء الحساب',
            text: 'رقم الهاتف غير صحيح!',
          });
        } else if (
          error.error.message.includes('whatsapp_num: Phone is invalid')
        ) {
          Swal.fire({
            icon: 'error',
            title: 'خطأ في انشاء الحساب',
            text: 'رقم الواتساب غير صحيح!',
          });
        }
        this.isSpinning = false;
      },
    });
  }
}
