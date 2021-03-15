import { Injectable, OnDestroy } from '@angular/core';
import { IPatient, IPatientTable } from '../interfaces/patitent';
import { Subject } from 'rxjs';
import { IAddress } from '../interfaces/address';
import { DataService } from './data.service';
import { IDoctor } from '../interfaces/doctor';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatitentService implements OnDestroy {
  patients: IPatient[] = [];
  doctors: IDoctor[] = require('./../../assets/data/doctors.json');
  private subscription: Subject<boolean> = new Subject<boolean>();
  constructor(private dataService: DataService) {
    this.dataService.getPatitentList().pipe(takeUntil(this.subscription)).subscribe((data: IPatient[]) => {
      this.patients = data;
    });
  }

  setupPatitentListForDisplay(list: IPatient[]): IPatientTable[] {
    let patitentTableData: IPatientTable[] = [];

    list.forEach((patient: IPatient) => {
      
      patitentTableData.push({
        id: patient.id,
        patientName: patient.firstName + ' ' +  patient.lastName,
        doctorName:  this.returnDoctor(patient.doctor).firstName + ' ' + this.returnDoctor(patient.doctor).lastName ,
        registrationDate: patient.registeredDate,
        homeAddress: this.returnHomeAddress(patient.addresses)
      });
    });

    return patitentTableData;
  }

  private returnDoctor(doctorId: number): IDoctor {
    let doctor: IDoctor = this.doctors.filter((doctor: IDoctor) => doctor.id === doctorId)[0];
    return doctor;
  }

  private returnHomeAddress(addresses: IAddress[]): IAddress {
    return addresses.filter((address: IAddress) => address.type === 'HOME')[0];
  }

  returnPatitentById(id: number): IPatient {
    return this.patients.filter((patient) => patient.id === id)[0];
  }

  ngOnDestroy(): void {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }
}
