import { Injectable } from '@angular/core';
import { ContactPerson, GroupedContactPersons } from '../models/interfaces';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _storage: Storage | null = null;
  private _groupedContactPersons: BehaviorSubject<GroupedContactPersons> =
    new BehaviorSubject<GroupedContactPersons>({});
  private storageInitialized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public groupedContactPersons$: Observable<GroupedContactPersons> =
    this._groupedContactPersons.asObservable();
  public storageInitialized$: Observable<boolean> =
    this.storageInitialized.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  async init(): Promise<void> {
    const storage = await this.storage.create();
    this._storage = storage;
    this.storageInitialized.next(true);
    this.getContactPersons();
  }

  public async isEmailTaken(email: string): Promise<boolean> {
    const contactPersons: ContactPerson[] = [];
    await this._storage?.forEach((value: ContactPerson, key, index) => {
      contactPersons.push(value);
    });

    return contactPersons.findIndex((cp) => cp.email === email) !== -1;
  }

  public async getContactPersons(): Promise<void> {
    const contactPersons: ContactPerson[] = [];
    await this._storage.forEach((value: ContactPerson, key, index) => {
      contactPersons.push(value);
    });
    this._groupedContactPersons.next(
      this.convertToGroupedContacts(contactPersons)
    );
  }

  public setContactPerson(key: string, person: ContactPerson): Promise<void> {
    return this._storage
      .set(key, person)
      .then(() => {
        return;
      })
      .then(() => {
        return this.getContactPersons().then(() => {
          return;
        });
      });
  }

  public removeContactPerson(key: string): Promise<void> {
    return this._storage
      .remove(key)
      .then(() => {
        return;
      })
      .then(() => {
        return this.getContactPersons().then(() => {
          return;
        });
      });
  }

  public getContactPersonByUid(key: string): Observable<ContactPerson> {
    return from(this._storage.get(key));
  }

  private convertToGroupedContacts(
    contactPersons: ContactPerson[]
  ): GroupedContactPersons {
    return contactPersons.reduce((groupedPersons, person) => {
      const personKey: string = person.lastName[0].toUpperCase();
      let group: ContactPerson[] | undefined = groupedPersons[personKey];
      if (group) {
        group.push(person);
      } else {
        groupedPersons[personKey] = [person];
      }
      return groupedPersons;
    }, {});
  }
}
