import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {
    //alert("Hello");
  }
  registrationForm = new FormGroup({
    email: new FormControl('test.sm@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('Hello@123', [
      Validators.required,
      Validators.email,
    ]),
    confirmPassword: new FormControl('Hello@123', [
      Validators.required,
      Validators.email,
    ]),
  });

  constructor(private authService: AuthService) {}

  submit() {
    let model: any = {};

    model['email'] = this.registrationForm.get('email')?.value;
    model['password'] = this.registrationForm.value?.password;
    
    this.authService.register(model);
  }

  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }
}

