import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  signinForm!: FormGroup;
  errorMessage!: string;
  isConnected : boolean = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      passWord: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  signIn() {
    this.authService.signInUser(this.signinForm.get('email')!.value,this.signinForm.get('passWord')!.value).then(
      () => {
        this.isConnected = true;
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = "INVALID_LOGIN_CREDENTIALS";
      }
    );
  }

  signOut(){
    this.authService.signOutUser();
    this.isConnected = false;
  }


}
