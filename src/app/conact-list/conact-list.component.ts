import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface Contact {
  id: number;
  firstName: string;
  phone: string;
  lastName: string;
}
@Component({
  selector: 'app-conact-list',
  templateUrl: './conact-list.component.html',
  styleUrls: ['./conact-list.component.css']
})


export class ConactListComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact:any;
  editMode:boolean=false;
  editForm: FormGroup;
  button = '';

  constructor(private formBuilder: FormBuilder,private http: HttpClient) {
    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],

    });
  }



  ngOnInit(): void {
    this.editForm.setValue({
      firstName: this.selectedContact?.firstName || '',
      lastName: this.selectedContact?.lastName || '',
      phone: this.selectedContact?.phone || ''
    });
    this.getContacts();
  }

  getContacts(): void {
    this.http.get<Contact[]>('https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts')
      .subscribe(contacts => {
        this.contacts = contacts;

      });
  }

  addContact(): void {
    this.editMode=true;
    this.button="Add "
    if(this.selectedContact.id){
      this.selectedContact.id=undefined;
    }
    this.editForm.setValue({
      firstName:  '',
      lastName:  '',
      phone:  ''
    });


  }





  deleteContact(contact: Contact): void {
    const index = this.contacts.findIndex(c => c.id === contact.id);
    if (index !== -1) {
      this.contacts.splice(index, 1);
    }
  }


  editContact(conact:Contact) {
    this.selectedContact = this.contacts.find(contact => contact.id === conact.id);
    this.editForm.setValue({
      firstName: this.selectedContact?.firstName || '',
      lastName: this.selectedContact?.lastName || '',
      phone: this.selectedContact?.phone || ''
    });
    this.button="Update "
    this.editMode = true;
  }

  updateContact2() {
    if (this.editForm.valid) {
      if(this.selectedContact == undefined || this.selectedContact.id == undefined){
        const timestamp = Date.now().toString(); // Get current timestamp as a string
  const random = Math.floor(Math.random() * 10000).toString(); // Generate a random number and convert it to a string
  const uniqueId = timestamp + random; // Concatenate the timestamp and random number


        this.selectedContact={
          id: parseInt(uniqueId)
        }

        }
      const updatedContact = {
        id: this.selectedContact.id,
        firstName: this.editForm.get('firstName')?.value,
        lastName: this.editForm.get('lastName')?.value,
        phone: this.editForm.get('phone')?.value
      };

      // Find the index of the selected contact in the contacts array
      const contactIndex = this.contacts.findIndex(contact => contact.id === updatedContact.id);

      if (contactIndex !== -1) {
        // Update the contact in the contacts array
        this.contacts[contactIndex] = updatedContact;

        // Reset the form and exit edit mode
        this.editForm.reset();
        this.editMode = false;
      }
      else{

        this.contacts.push(updatedContact);
        this.editMode = false;
        this.editForm.reset();
      }
    }
  }

}
