import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPatient } from '../interfaces/patitent';
import { IDoctor } from '../interfaces/doctor';
import { FormGroup } from '@angular/forms';
import { IAddress } from '../interfaces/address';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getPatitentList(): Observable<IPatient[]> {
    return this.http.get<IPatient[]>('/assets/data/patients.json');
  }

  public getDoctorList(): Observable<IDoctor[]> {
    return this.http.get<IDoctor[]>('/assets/data/doctors.json');
  }

  public postPatient(patitentInfo: FormGroup, patientAddresses: IAddress[]): Observable<IPatient> {
    const patitentObject: IPatient = {
      id: null,
      registeredDate: null,
      firstName: patitentInfo.get('firstName').value,
      lastName: patitentInfo.get('lastName').value,
      doctor: patitentInfo.get('doctor').value,
      addresses: patientAddresses
    }
    return this.http.post<IPatient>('/api/patient', patitentObject);
  }
}
