import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn, FormArray, Form } from '@angular/forms';
import { startWith, map, filter, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DoctorService } from 'src/app/services/doctor.service';
import { DataService } from 'src/app/services/data.service';
import { IDoctor, IDoctorAutocomplete } from 'src/app/interfaces/doctor';
import { emailValidators, phoneValidators } from 'src/app/validators/validators';
import { AddressDialogComponent } from '../address-dialog/address-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { IAddress } from 'src/app/interfaces/address';
import { IPatient } from 'src/app/interfaces/patitent';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit, OnDestroy {
  doctorSearchControl = new FormControl();
  doctors: IDoctorAutocomplete[] = [];
  filteredDoctors: Observable<string[]>;

  patientForm: FormGroup;
  homeAddressForm: FormGroup;

  maxDate = new Date();

  addressDialogRef: MatDialogRef<AddressDialogComponent>;

  otherAddresses: IAddress[] = [];
  columns: string[] = ['type', 'street', 'city', 'zip', 'country', 'actions'];
  private subscription: Subject<boolean> = new Subject<boolean>();
  openAddressDialog() {
    this.addressDialogRef = this.dialog.open(AddressDialogComponent);

    this.addressDialogRef.afterClosed().pipe(takeUntil(this.subscription)).subscribe((newAddress: FormGroup) => {
      if (newAddress) {
        this.otherAddresses.push(newAddress.value);
        this.otherAddresses = [...this.otherAddresses];
      }
    });
  }
  constructor(
    private fb: FormBuilder, 
    private doctorService: DoctorService, 
    private dataService: DataService,
    private dialog: MatDialog,
    private router: Router) {
    this.dataService.getDoctorList().pipe(takeUntil(this.subscription)).subscribe((doctors: IDoctor[]) => {
      doctors.forEach(doctor => {
        this.doctors.push({
          id: doctor.id,
          fullName: doctor.firstName + ' ' + doctor.lastName
        });
      });
      this.filteredDoctors = this.doctorSearchControl.valueChanges
        .pipe(
          startWith(''),
          map(val => this.filterDoctors(val))
        );
    });

    this.createForm();
  }
  public createForm() {
    
    this.homeAddressForm = this.createAddressForm();
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      vatCode: ['', Validators.required],
      email: ['', [...emailValidators]],
      doctor: ['', [Validators.required]]
    });

    const vatCodeControl = this.patientForm.get('vatCode');


    this.patientForm.get('birthDate').valueChanges.pipe(takeUntil(this.subscription)).subscribe(
      (date: Date) => {
        if (this.isVatCodeIsRequired(date)) {
          vatCodeControl.setValidators([Validators.required]);
        }
        else {
          vatCodeControl.clearValidators();
        }
        vatCodeControl.updateValueAndValidity();
      });
  }
  ngOnInit(): void {

  }

  isVatCodeIsRequired(date: Date): boolean {
    let isRequired: boolean = false;

    var nowUTC = Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds());
    var birthUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

    if ((nowUTC - birthUTC) / 31556952000 >= 18) {
      isRequired = true
    } else {
      isRequired = false;
    }

    return isRequired;
  }

  filterDoctors(val: string): string[] {
    return this.doctors.map(x => x.fullName).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  doctorSelected(event: MatAutocompleteSelectedEvent): void {
    this.patientForm.patchValue({
      doctor: this.doctorService.returnDoctorByFullName(event.option.value).id
    });
  }

  addNumberPrefix(): void {
    if (this.homeAddressForm.get('phone').value.length === 0) {
      this.homeAddressForm.patchValue({
        phone: '+39'
      });
    }
  }


  private createAddressForm(): FormGroup {
    return this.fb.group({
      type: ['HOME', Validators.required],
      phone: ['', [...phoneValidators, Validators.minLength(8)]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  submitForm(): void {
    let patientAddresses: IAddress[] = [this.homeAddressForm.value, ...this.otherAddresses];
    
    this.dataService.postPatient(this.patientForm, patientAddresses).pipe(takeUntil(this.subscription)).subscribe((data: IPatient) => {
      this.router.navigate(['/list-patient']);
    }, err => {
      this.router.navigate(['/list-patient']);
    });
  }

  ngOnDestroy(): void {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }

  deleteAddress(addressIndex: number): void {
    this.otherAddresses.splice(addressIndex, 1);
  }
}
