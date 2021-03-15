import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { ListPatientComponent } from './components/list-patient/list-patient.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      pageTitle: 'Home'
    }
  },
  {
    path: 'new-patient',
    component: AddPatientComponent,
    data: {
      pageTitle: 'Add new patient'
    }
  },
  {
    path: 'list-patient',
    component: ListPatientComponent,
    data: {
      pageTitle: 'List patient'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
