import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IPatient } from 'src/app/interfaces/patitent';
import { emailValidators, phoneValidators } from 'src/app/validators/validators';
import { IAddress } from 'src/app/interfaces/address';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {
  patientForm: FormGroup;
  homeAddressForm: FormGroup;
  columns: string[] = ['type', 'street', 'city', 'zip', 'country'];
  otherAddresses: IAddress[] = [];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PatientDetailComponent>,
    private doctorService: DoctorService,
    @Inject(MAT_DIALOG_DATA) public data: IPatient
  ) {
    this.patientForm = this.fb.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      registeredDate: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      vatCode: ['', Validators.required],
      email: ['', [...emailValidators]],
      doctor: ['', [Validators.required]]
    });

    this.homeAddressForm = this.fb.group({
      name: [''],
      type: ['HOME', Validators.required],
      phone: ['', [...phoneValidators, Validators.minLength(8)]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.patientForm.disable();
    this.homeAddressForm.disable();
  }

  ngOnInit(): void {
    this.patientForm.setValue({
      id: this.data.id,
      registeredDate: this.data.registeredDate,
      birthDate: null,
      vatCode: null,
      email: null,
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      doctor: this.doctorService.returnDoctorById(this.data.doctor).firstName + ' ' + this.doctorService.returnDoctorById(this.data.doctor).lastName
    });

    this.data.addresses.forEach(address => {
      if (address.type === 'HOME') {
        this.homeAddressForm.setValue({
          type: address.type,
          name: address.name || null,
          phone: address.phone,
          street: address.street,
          city: address.city,
          zip: address.zipcode,
          country: address.country
        })
      } else {
        this.otherAddresses.push(address);
      }
    });
    
    console.log(this.patientForm.value);
    console.log(this.homeAddressForm.value);
    console.log(this.otherAddresses);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
