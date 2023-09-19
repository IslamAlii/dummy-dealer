import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private modalRef: any;

  user: any;
  isSpinning!: boolean;
  errorMessage!: string;

  constructor(
    private userDataService: UserDataService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getUserPersonalInfo();
  }

  getUserPersonalInfo() {
    this.isSpinning = true;
    this.userDataService.getLoggedUserPersonalInfo().subscribe(
      (response) => {
        this.user = response.body;
        this.isSpinning = false;
      },
      (error) => {
        this.isSpinning = false;
        this.errorMessage = 'حدث خطا ما برجاء التواصل مع الادارة';
      }
    );
  }

  editPersonalInfo(form: NgForm) {
    this.userDataService.updateUserData(form.value).subscribe(
      (response) => {
        this.getUserPersonalInfo();
      },
      (error) => {
        this.isSpinning = false;
        this.errorMessage = 'حدث خطا ما برجاء التواصل مع الادارة';
      }
    );
  }

  open(content: any, size?: string) {
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: size ? size : '',
    });
  }
}
