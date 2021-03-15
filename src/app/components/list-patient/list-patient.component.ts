import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { PatitentService } from 'src/app/services/patitent.service';
import { IPatient, IPatientTable } from 'src/app/interfaces/patitent';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PatientDetailComponent } from '../patient-detail/patient-detail.component';
@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.scss']
})
export class ListPatientComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  patientDialogRef: MatDialogRef<PatientDetailComponent>;

  private subscription: Subject<boolean> = new Subject<boolean>();
  public dataSource: IPatientTable[] = [];
  public data: MatTableDataSource<IPatientTable>;
  public tableColumns  :  string[] = ['patientName', 'registrationDate', 'doctorName', 'homeAddress'];
  constructor(private dataService: DataService, 
    private patientService: PatitentService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getList();
  }

  private getList(): void {
    this.dataService.getPatitentList().pipe(takeUntil(this.subscription)).subscribe((patientList: IPatient[]) => {
      this.dataSource = this.patientService.setupPatitentListForDisplay(patientList);
      this.data = new MatTableDataSource(this.dataSource);
      this.data.paginator = this.paginator;
    })
  }

  ngOnDestroy(): void {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }

  openPatientDialog(patient: IPatient) {
    this.patientDialogRef = this.dialog.open(PatientDetailComponent, {data: this.patientService.returnPatitentById(patient.id)});
  }
}
