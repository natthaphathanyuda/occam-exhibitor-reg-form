import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ComponentsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  eventSelectionForm: FormGroup = new FormGroup({
    S_event: new FormControl(''),
    S_company: new FormControl('')
  });
  companyMap: { [event: string]: any[] } = {};
  isCompanySelected: boolean = false;
  isDropdownOpen: boolean = false;
  isSubmit: boolean = false;
  isLoading: boolean = false;

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.onGetCompanyList();
    this.onCompanyChange();
  }

  onCompanyChange() {
    this.eventSelectionForm.get('S_company')?.valueChanges.subscribe((value) => {
      if (this.eventSelectionForm.get('S_company')?.value && !this.isCompanySelected) {
        this.isCompanySelected = true;
      }
    });
  }

  onGetCompanyList() {
    this.isLoading = true;
    this.apiService.getCompanyList()
      .pipe(
        map((res: { status: boolean, message: any }) => {
          if (res.status && res.message.length > 0) {
            const companyMap: { [event: string]: any[] } = {
              "FHA-Food & Beverage": [],
              "Prowine Singapore": []
            };
            res.message.forEach((company: any) => {
              if (company.S_event.includes("FHA")) {
                companyMap["FHA-Food & Beverage"].push(company);
              } else if (company.S_event.includes("Prowine")) {
                companyMap["Prowine Singapore"].push(company);
              }
            });
            return companyMap;
          } else {
            return {};
          }
        })
      ).subscribe((companyMap: { [event: string]: any[] }) => {
        this.companyMap = companyMap;
        this.isLoading = false;
      });
  }

  onEventChange() {
    this.eventSelectionForm.get('S_company')?.setValue('');
  }

  onCompanySelect(company: string) {
    this.eventSelectionForm.get('S_company')?.setValue(company);
  }

  onSubmit(isSubmit: boolean) {
    if (isSubmit) {
      this.isSubmit = true;
    } else {
      this.eventSelectionForm.get('S_company')?.setValue('');
      this.eventSelectionForm.get('S_event')?.setValue('');
      this.isSubmit = false;
      this.isCompanySelected = false;
    }
  }
}
