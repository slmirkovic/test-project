import { Validators, FormControl } from '@angular/forms';

const EMAIL_RGX: RegExp = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$/;
const PHONE_RGX: RegExp = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
let isPresent = (obj: any) => obj !== undefined && obj !== null;

export const emailValidator =  function(formControl: FormControl) {
  let value = formControl.value;
  return EMAIL_RGX.test(value) ? null : {email: {value}};
}

export const emailValidators = [Validators.required, emailValidator];

export const phoneValidator =  function(formControl: FormControl) {
  let value = formControl.value;
  if (isPresent(Validators.required(formControl))) return null;
  return PHONE_RGX.test(value) ? null : {phone: true};
}

export const phoneValidators = [Validators.required, phoneValidator];
