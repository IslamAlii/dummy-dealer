import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { UserLoginResponse } from 'src/app/interfaces/user';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  private modalRef: any;
  loginSubscription: Subscription = new Subscription();
  forgotPasswordSubscription: Subscription = new Subscription();
  isSpinning: boolean = false;

  constructor(
    config: NgbModalConfig,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  navigateToSignup() {
    this.router.navigate(['signup']);
  }

  open(content: any) {
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  login(form: NgForm) {
    this.isSpinning = true;
    this.loginSubscription.add(
      this.authService.userLogin(form.value).subscribe({
        next: (res: UserLoginResponse) => {
          console.log(res.body.user);
          this.isSpinning = false;
          this.toastr.success('تم تسجيل الدخول بنجاح', 'تسجيل الدخول');
          this.router.navigate(['dashboard']);
        },
        error: (err: HttpErrorResponse) => {
          this.isSpinning = false;
          if (err.statusText == 'Unauthorized')
            Swal.fire({
              icon: 'error',
              title: 'تسجيل الدخول',
              text: 'البريد الالكتروني او كلمة السر غير صحيحة!',
            });
        },
      })
    );
  }

  resetPassword(form: NgForm) {
    this.isSpinning = true;
    this.forgotPasswordSubscription.add(
      this.authService
        .forgetPassword({ email: form.value.forgetPasswordEmail })
        .subscribe({
          next: (res) => {
            this.isSpinning = false;
            Swal.fire({
              icon: 'success',
              title: 'نسيت كلمة المرور',
              text: 'تم ارسال رسالة الي عنوان البريد الذي أدخلته',
            });
            this.modalRef.close();
          },
          error: (error: HttpErrorResponse) => {
            this.isSpinning = false;
            if (error.error.message == 'no user found with this email') {
              Swal.fire({
                icon: 'error',
                title: 'نسيت كلمة المرور',
                text: 'البريد الالكتروني الذي أدخلته غير مسجل',
              });
            }
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
    this.forgotPasswordSubscription.unsubscribe();
  }
}
