import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;
  constructor(private fb: FormBuilder, private accountService: AccountService, private route: Router) { }

  ngOnInit() {
    this.CreateRegisterForm();
  }

  CreateRegisterForm() {
    this.RegisterForm = this.fb.group({
      displayName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit() {
    // console.log(this.RegisterForm.value);
    this.accountService.register(this.RegisterForm.value).subscribe(() => {
      this.route.navigateByUrl('/shop');
    }, error => {
      console.log(error);
    });
  }
}
