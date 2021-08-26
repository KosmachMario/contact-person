import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPersonEditComponent } from './contact-person-edit.component';

describe('ContactPersonEditComponent', () => {
  let component: ContactPersonEditComponent;
  let fixture: ComponentFixture<ContactPersonEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactPersonEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPersonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
