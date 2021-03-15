import { Injectable } from '@angular/core';
import { IDoctor } from '../interfaces/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  doctors: IDoctor[] = require('./../../assets/data/doctors.json');
  constructor() { }

  returnDoctorById(id: number): IDoctor {
    return this.doctors.filter((doctor: IDoctor) => doctor.id === id)[0];
  }

  returnDoctorByFullName(fullName: string): IDoctor {
    return this.doctors.filter((doctor: IDoctor) => doctor.firstName + ' ' + doctor.lastName === fullName)[0];
  }
}
