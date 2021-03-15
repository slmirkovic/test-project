import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { ListPatientComponent } from './components/list-patient/list-patient.component';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DataService } from './services/data.service';
import { PatitentService } from './services/patitent.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DoctorService } from './services/doctor.service';
import { AddressDialogComponent } from './components/address-dialog/address-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SideMenuComponent,
    AddPatientComponent,
    ListPatientComponent,
    PatientDetailComponent,
    AddressDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [HttpClient, DataService, PatitentService, MatDatepickerModule, MatNativeDateModule, DoctorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
