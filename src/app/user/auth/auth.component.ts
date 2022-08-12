import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import { EditUser } from './edit-user';
import { CompanyService } from 'src/app/job/company/company.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  user: User = {id: '', email: '', password: '', token: '', userName: '', firstname: '', 
                lastname: '', isAdmin: false, isSuper: false, companies: []};
  editUser: EditUser = {username: "", isAdmin: false}
  isSubmitted: boolean = false;
  error: string = '';
  isLogin: boolean = false;
  isRegister: boolean = false;
  isLogout: boolean = false;
  isEdit: boolean = false;

  constructor(private auth: AuthService, private router: Router, private comp: CompanyService) { }

  ngOnInit(): void {
    switch (this.router.url) {
      case '/login': {
        this.isLogin = true;
        break;
      }
      case '/logout': {
        this.isLogout = true;
        this.auth.deleteToken();
        this.router.navigate(['']);
        break;
      }
      case '/register': {
        this.isRegister = true;
        break;
      }
      case '/account/edit': {
        this.isEdit = true;
        this.user = this.auth.getUser() ?? this.user;
        break;
      }
      default: {
        this.isLogin = true;
        break;
      }
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.isRegister) {
      this.error='';
      this.auth.register(this.user).subscribe(r => this.login());
    }
    if (this.isLogin) {
      this.login();
    } else if (this.isEdit) {
      this.editUser = {
        username: this.user.userName, email: this.user.email, firstName: this.user.firstname,
        lastName: this.user.lastname, address: this.user.address, linkedIn: this.user.linkedIn,
        phoneNumber: this.user.phoneNumber, isAdmin: this.user.isAdmin
      }
      this.auth.editUser(this.user.id, this.editUser).subscribe(r => {
        this.login();
      });
    } else {
      //others?
    }
  }

  login(): void {
    this.auth.authenticate(this.user).subscribe({next: r => {
      console.log(r.user);
      this.error = '';
      localStorage.setItem('token', r.accessToken);
      localStorage.setItem('id', r.user.id);
      localStorage.setItem('email', r.user.email ?? "");
      localStorage.setItem('firstName', r.user.firstname ?? "");
      localStorage.setItem('lastName', r.user.lastname ?? "");
      localStorage.setItem('userName', r.user.userName);
      localStorage.setItem('phoneNumber', r.user.phoneNumber ?? "");
      localStorage.setItem('address', r.user.address ?? "");
      localStorage.setItem('linkedIn', r.user.linkedIn ?? "");
      localStorage.setItem('isAdmin', r.user.isAdmin ? 'true' : '');
      localStorage.setItem('isSuper', r.user.isSuper ? 'true' : '');
      this.router.navigate(this.isEdit? ['account'] : [''])
        .then(() => {
        window.location.reload();
      });
    }, error: e => {
      this.error = 'Information incorrect!';
      this.isSubmitted = false;
    }});
  }

}
