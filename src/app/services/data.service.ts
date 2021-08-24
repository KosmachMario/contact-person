import { Injectable } from '@angular/core';
import { ContactPerson, GroupedContactPersons } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _contactPersons: ContactPerson[] = [
    {
      id: 0,
      firstName: 'Matt',
      lastName: 'Chorsey',
      email: 'matt.chorsey@gmail.com',
      address: {
        street: 'Badger Pond Lane',
        streetNo: 2820,
        city: 'Crafton',
        country: 'Pennsylvania',
        postalCode: 15205,
      },
    },
    {
      id: 1,
      firstName: 'Lauren',
      lastName: 'Ruthford',
      email: 'lauren.ruthford@gmail.com',
      address: {
        street: 'Parkway Drive',
        streetNo: 2739,
        city: 'Tucson',
        country: 'Arizona',
        postalCode: 85712,
      },
    },
    {
      id: 2,
      firstName: 'Jordan',
      lastName: 'Firth',
      email: 'jordan.firth@gmail.com',
      address: {
        street: 'Riverside Drive',
        streetNo: 1986,
        city: 'Danielsville',
        country: 'Georgia',
        postalCode: 30633,
      },
    },
    {
      id: 3,
      firstName: 'Mario',
      lastName: 'Chap',
      email: 'mario.Chap@gmail.com',
      address: {
        street: 'Riverside Drive',
        streetNo: 1920,
        city: 'Crafton',
        country: 'Pennsylvania',
        postalCode: 15205,
      },
    }
  ];

  constructor() {}

  public getContactPersonsCount(): number {
    return this._contactPersons.length;
  }

  public getContactPersons(): ContactPerson[] {
    return this._contactPersons;
  }

  public getContactPersonById(index: number): ContactPerson {
    return this._contactPersons[index];
  }

  public addContactPerson(person: ContactPerson): void {
    this._contactPersons.push(person);
  }

  public removeContactPerson(index: number): void {
    this._contactPersons.splice(index, 1);
  }

  public getGroupedContactPersons(): GroupedContactPersons {
    return this._contactPersons.reduce((groupedPersons, person) => {
      const personKey: string = person.lastName[0].toUpperCase();
      let group: ContactPerson[] | undefined =
        groupedPersons[personKey];
      if (group) {
        group.push(person);
      } else {
        groupedPersons[personKey] = [person];
      }
      return groupedPersons;
    }, {});
  }
}
