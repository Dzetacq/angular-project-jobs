import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth/auth.service';
import { User } from '../user/user';

@Component({
  selector: 'app-super',
  templateUrl: './super.component.html',
  styleUrls: ['./super.component.scss']
})
export class SuperComponent implements OnInit {
  user: User = {id: "", userName: "", isAdmin: false, isSuper: false, companies: []};
  constructor(private auth: AuthService) { 
    this.user = auth.getUser() ?? this.user;
    if (!this.user.isSuper) {
      window.history.back();
    }
  }

  ngOnInit(): void {
  }

}
