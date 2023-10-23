import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/userSignup.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{

  signupForm!: FormGroup;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required, Validators.pattern("[0-9 ]{9}")],
      country: ['', Validators.required],
      sexe: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passWord: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      passWordConfirm: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const newUser = new User(
      this.signupForm.get('firstName')!.value,
      this.signupForm.get('lastName')!.value,
      this.signupForm.get('phoneNumber')!.value,
      this.signupForm.get('country')!.value,
      this.signupForm.get('sexe')!.value,
      this.signupForm.get('email')!.value,
      this.signupForm.get('passWord')!.value
    )

    if(newUser.passWord === this.signupForm.get('passWordConfirm')!.value){
      this.authService.createNewUser(newUser).then(
        () => {
          console.log("User created !")
          alert("SUCCES !")
          this.router.navigate(['/login']);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }else{
      this.errorMessage = "Password différents. Veuillez fournir le même mot de pass !";
    }
  }


}
