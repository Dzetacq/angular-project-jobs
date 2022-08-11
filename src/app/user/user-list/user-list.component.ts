import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  user: User = {id: "", userName: "", isAdmin: false, isSuper: false, companies: []};
  errorMessage: string = '';
  subs: Subscription[] = [];
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  delete(id: string) {
    this.subs.push(this.auth.deleteUser(id).subscribe(r => {
      this.getUsers();
    }, error => {
      this.errorMessage = error.message;
    }))
  }

  getUsers() {
    this.subs.push(this.auth.getUsers().subscribe(r => 
        this.users = r.sort((a, b) => {
          let aAdmin = 0 + (a.isAdmin ? 1 : 0) + (a.isSuper ? 2 : 0);
          let bAdmin = 0 + (b.isAdmin ? 1 : 0) + (b.isSuper ? 2 : 0);
          return aAdmin > bAdmin ? -1 : aAdmin < bAdmin || a.userName > b.userName ? 1 : -1;
        })));
    this.user = this.auth.getUser() ?? this.user;
  }
}
