import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'https://staging-fha-2024.occamlab.com.sg';

  constructor(private http: HttpClient) { }

  getCompanyList(): any {
    return this.http.post(`${this.baseUrl}/api/exhibitor-company-list`, {});
  }

  getCountryList(): any {
    return this.http.get(`${this.baseUrl}/public/provinces.json`);
  }

  registerExhibitor(body: any): any {
    return this.http.post(`${this.baseUrl}/api/add-exhibitor`, body);
  }
}
