import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(
    private userData: UserDataService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userData.getLoggedUserAllInfo().subscribe((response) => {
      this.userData.setUserData(response.body);
      this.userData.getUserData().subscribe((response) => {
        this.userRole = response?.user?.role;
        console.log(this.userRole);
        this.isLoading = false;
        this.cdRef.detectChanges();
      });
    });
  }

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }
}
