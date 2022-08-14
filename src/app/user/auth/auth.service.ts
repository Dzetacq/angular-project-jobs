import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../user';
import {Observable} from 'rxjs';
import {UserResponse} from '../userResponse';
import {api} from '../../../global'
import { EditUser } from './edit-user';
import { EditPassword } from '../editPassword';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  url: string = api + "Authenticate/";
  userUrl: string = api + "Users/";
  constructor(private http: HttpClient) { }
  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }
  getUser(): User | null {
    if (this.isLoggedIn()) {
      return {id: localStorage.getItem('id')?? '', 
        userName: localStorage.getItem('userName') ?? '',
        email: localStorage.getItem('email')??'', 
        firstname: localStorage.getItem('firstName')??'', 
        lastname: localStorage.getItem('lastName')??'', 
        phoneNumber: localStorage.getItem('phoneNumber')??'', 
        address: localStorage.getItem('address')??'', 
        linkedIn: localStorage.getItem('linkedIn')??'', 
        isAdmin: (localStorage.getItem('isAdmin') == "true"),
        isSuper: (localStorage.getItem('isSuper') == "true"), 
        token: localStorage.getItem('token')??'', 
        password: null, companies: []}
    }
    return null;
  }
  deleteToken(): void {
    localStorage.removeItem('token');
  }
  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }
  authenticate(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.url + 'login', user);
  }
  editUser(id: string, user: EditUser): Observable<UserResponse> {
    return this.http.put<UserResponse>(this.url + 'edit/' + id, user);
  }
  register(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.url + 'register', user);
  }
  deleteUser(id: string): Observable<UserResponse> {
    return this.http.delete<UserResponse>(this.userUrl + id);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.userUrl + id);
  }
  changePassword(id: string, newPw: EditPassword): Observable<User> {
    return this.http.put<User>(this.url + "password/" + id, newPw);
  }
}
