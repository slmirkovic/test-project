import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { phoneValidators } from 'src/app/validators/validators';

@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddressDialogComponent>
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      type: ['', Validators.required],
      name: [''],
      phone: ['', [...phoneValidators, Validators.minLength(8)]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required]
    });

    
  }
  addNumberPrefix(): void {
    if (this.form.get('phone').value.length === 0) {
      this.form.patchValue({
        phone: '+39'
      });
    }
  }
  submitForm() {
    this.dialogRef.close(this.form);
  }

  isNameFieldIsPresent(): boolean {
    if (this.form.get('type').value === 'WORK' || this.form.get('type').value === 'CLOSE_RELATIVE') {
      return true;
    } else {
      return false;
    }
  }
}
