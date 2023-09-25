import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isSidebarClosed = false;
  isLoading: boolean = true;
  userRole!: string;
  errorHappend!: boolean;

  constructor(
    private userData: UserDataService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userData.getLoggedUserAllInfo().subscribe(
      (response) => {
        this.userData.setUserData(response.body);
        this.userData.getUserData().subscribe((response) => {
          this.userRole = response?.user?.role;
          this.isLoading = false;
          this.cdRef.detectChanges();
        });
      },
      (error) => {
        this.isLoading = false;
        this.errorHappend = true;
      }
    );
  }

  logout() {
    this.authService.userLogout();
    this.router.navigate(['login']);
    this.toastr.success('تم تسجيل الخروج', 'تسجيل الخروج');
  }

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }
}
