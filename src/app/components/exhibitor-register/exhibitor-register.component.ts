import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { map } from 'rxjs/operators';
import { RegistrationModalComponent } from '../registration-modal/registration-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-exhibitor-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './exhibitor-register.component.html',
  styleUrl: './exhibitor-register.component.scss'
})
export class ExhibitorRegisterComponent implements OnInit {
  @Input() event: string = '';
  @Input() company: string = '';
  @Output() isSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  exhibitorForm: FormGroup;
  countries: { country: string }[] = [];
  failedExhibitorCount: number = 0;
  isSubmitted: boolean = false;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private modalService: MatDialog) {
    this.exhibitorForm = this.fb.group({
      exhibitors: this.fb.array([this.createExhibitorFormGroup()])
    });
  }

  ngOnInit(): void {
    this.onGetCountryList();
  }

  onGetCountryList() {
    this.apiService.getCountryList()
      .pipe(
        map((res: any) => {
          const uniqueCountries = [...new Set(res.map((province: any) => province.country))];
          res = uniqueCountries.map(country => ({ country }));
          return res;
        })
      ).subscribe((countryList: any[]) => {
        this.countries = countryList;
      });
  }

  get exhibitors(): FormArray {
    return this.exhibitorForm.controls['exhibitors'] as FormArray;
  }

  createExhibitorFormGroup(): FormGroup {
    return this.fb.group({
      S_email: ['', [Validators.required, Validators.email]],
      S_name_on_badge: ['', Validators.required],
      S_job_title: ['', Validators.required],
      S_country: ['', Validators.required],
      S_company_on_badge: ['', Validators.required],
      errorMessage: [''],
      isRegistered: [false],
      isDropdownOpen: [false]
    });
  }

  addExhibitor() {
    this.exhibitors.push(this.createExhibitorFormGroup());
  }

  removeExhibitor(index: number) {
    this.exhibitors.removeAt(index);
  }

  async register() {
    this.failedExhibitorCount = 0;
    this.isLoading = true;
    const groupRegId = Array(5).fill(0).map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
    const promises = this.exhibitors.controls.map(async (exhibitor: any, index: number) => {
      if (exhibitor.valid) {
        const body = {
          "S_added_via": "Web Form",
          "S_company": index == 1 && !this.isSubmitted ? "test test" : this.company,
          "S_email_address": exhibitor.get('S_email')?.value,
          "S_group_reg_id": groupRegId,
          "S_name_on_badge": exhibitor.get('S_name_on_badge')?.value,
          "S_job_title": exhibitor.get('S_job_title')?.value,
          "S_country": exhibitor.get('S_country')?.value,
          "S_company_on_badge": exhibitor.get('S_company_on_badge')?.value,
          "SB_event_fha": this.event === 'FHA-Food & Beverage',
          "SB_event_prowine": this.event === 'Prowine Singapore'
        };
        let exhibitorForm = this.exhibitors.controls[index] as FormGroup;
        if (exhibitorForm.get('isRegistered')?.value) return;
        try {
          await this.apiService.registerExhibitor(body).toPromise();
          exhibitorForm.get('isRegistered')?.setValue(true);
        } catch (err: any) {
          this.failedExhibitorCount++;
          exhibitorForm.get('errorMessage')?.setValue(err.error.message);
        }
      } else {
        this.failedExhibitorCount++;
      }
    });

    await Promise.all(promises).then(() => {
      if (this.failedExhibitorCount > 0) {
        this.isSubmitted = true;
        this.isSubmit.emit(true);
      } else {
        this.openRegistrationModal();
      }
    }).finally(() => {
      this.isLoading = false;
    });
  }

  get checkExhibitors(): boolean {
    let isInvalid = true;
    this.exhibitors.controls.forEach((exhibitor: any) => {
      if (exhibitor.valid && !exhibitor.get('isRegistered')?.value) {
        isInvalid = false;
      }
    });
    return isInvalid;
  }

  openRegistrationModal() {
    const modalRef = this.modalService.open(RegistrationModalComponent, {
      width: '340px'
    });
    const code = Array(5).fill(0).map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
    modalRef.componentInstance.code = code;
    modalRef.afterClosed().subscribe(() => {
      this.isSubmitted = false;
      this.isSubmit.emit(false);
      this.exhibitors.clear();
      this.addExhibitor();
    });
  }
}
