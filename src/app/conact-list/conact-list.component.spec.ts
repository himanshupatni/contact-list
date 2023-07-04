import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ConactListComponent } from './conact-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('ConactListComponent', () => {
  let component: ConactListComponent;
  let fixture: ComponentFixture<ConactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule,HttpClientModule,ReactiveFormsModule],
      declarations: [ConactListComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update contact on valid form submission', () => {
    // Set up test data
    const existingContact = {
      id: 1,
      firstName: 'Amit',
      lastName:'Roy',
      phone: '9876543210'
    };

    component.contacts = [existingContact];
    component.selectedContact = existingContact;

    // Modify form values
    component.editForm.setValue({
      firstName: 'Updated Name',
      lastName: 'Name',
      phone: '9876543210'
    });

    // Trigger updateContact method
    component.updateContact2();

    // Verify that the contact was updated
    expect(component.contacts[0].firstName).toBe('Updated Name');
    expect(component.contacts[0].lastName).toBe('Name');
    expect(component.contacts[0].phone).toBe('9876543210');
    expect(component.editForm.valid).toBe(true);
    expect(component.editMode).toBe(false);
  });

  it('should not update contact on invalid form submission', () => {
    // Set up test data
    const existingContact = {
      id: 1,
      firstName: 'Amit',
      lastName:'Roy',
      phone: '9876543210'
    };

    component.contacts = [existingContact];
    component.selectedContact = existingContact;

    // Modify form values to make it invalid
    component.editForm.setValue({
      lastName: '', // Invalid empty name
      phone: '9876543210'
    });

    // Trigger updateContact method
    component.updateContact2();

    // Verify that the contact was not updated
    expect(component.contacts[0].firstName).toBe('Amit'); // Name should not change
    expect(component.contacts[0].lastName).toBe('Roy'); // Name should not change
    expect(component.contacts[0].phone).toBe('9876543210'); // Phone should not change
    expect(component.editForm.valid).toBe(false); // Form should be invalid
    expect(component.editMode).toBe(true); // Still in edit mode
  });

});
