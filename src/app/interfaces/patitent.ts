import { IAddress } from './address';


export interface IPatient {
    id: number;
    registeredDate: Date;
    firstName: string;
    lastName: string;
    doctor: number;
    addresses: IAddress[];
}

export interface IPatientTable {
    id: number;
    patientName: string;
    registrationDate: Date;
    doctorName: string;
    homeAddress: IAddress;
}