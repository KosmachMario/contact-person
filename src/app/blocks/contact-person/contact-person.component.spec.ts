import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/routing/app-routing.module';

import { ContactPersonComponent } from './contact-person.component';

describe('ContactPersonComponent', () => {
  let component: ContactPersonComponent;
  let fixture: ComponentFixture<ContactPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactPersonComponent],
      imports: [AppRoutingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should give back full name', () => {
    component.contactPerson = {
      firstName: 'Mario',
      lastName: 'Kosmach',
      email: 'mario.kosmach@gmail.com',
      uid: '1',
      address: {
        city: 'Skopje',
        country: 'Macedonia',
        postalCode: 1000,
        street: 'Bulevar',
        streetNo: 15,
      },
    };

    expect(component.fullName).toBe('Mario Kosmach');
  });
});
