import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    //alert("Hello");
  }
  loginForm = new FormGroup({
    email: new FormControl('emilys', [Validators.required, Validators.email]),
    password: new FormControl('emilyspass', [
      Validators.required,
      Validators.email,
    ]),
  });

  constructor(private authService: AuthService) {}
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  
  submit() {
    let model: any = {};

    model['email'] = this.email?.value;
    model['username'] = this.email?.value;
    model['password'] = this.password?.value;

    this.authService.login(model);
  }
}
