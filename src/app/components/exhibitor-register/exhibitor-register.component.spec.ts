import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitorRegisterComponent } from './exhibitor-register.component';

describe('ExhibitorRegisterComponent', () => {
  let component: ExhibitorRegisterComponent;
  let fixture: ComponentFixture<ExhibitorRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitorRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
