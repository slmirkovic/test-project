import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { IPatient } from './interfaces/patitent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'test-project';

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    
  }
}
