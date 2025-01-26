import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExhibitorRegisterComponent } from './exhibitor-register/exhibitor-register.component';
import { RegistrationModalComponent } from './registration-modal/registration-modal.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExhibitorRegisterComponent,
    RegistrationModalComponent
  ],
  exports: [
    ExhibitorRegisterComponent,
    RegistrationModalComponent
  ]
})
export class ComponentsModule { }
