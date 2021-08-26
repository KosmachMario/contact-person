import { Component, OnInit } from '@angular/core';
import { ContactPerson } from '../../models/interfaces';
import { DataService } from '../../services/data.service';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-person-add',
  templateUrl: './contact-person-add.component.html',
  styleUrls: ['./contact-person-add.component.css']
})
export class ContactPersonAddComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }

  public onAddButtonClicked(value: ContactPerson): void {
    const generatedUid: string = uuidv4();
    value.uid = generatedUid;
    this.dataService.setContactPerson(generatedUid, value).then(() => {
      this.router.navigate(['/home']);
    });
  }

  ngOnInit(): void {
  }

}
