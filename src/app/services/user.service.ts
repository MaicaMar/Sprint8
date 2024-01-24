// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.api_url;

  constructor(private http: HttpClient) { }

  getUsers(page: number, usersPerPage: number): Observable<User[]> {
    return this.http.get<User[]>(`${environment.api_url}/users`, {
      params: new HttpParams()
        .set('_page', page.toString())
        .set('_limit', usersPerPage.toString())
    });
  }
  

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}`);
  }
}
