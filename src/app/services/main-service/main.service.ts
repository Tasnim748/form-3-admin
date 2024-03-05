import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { backURL, Work } from 'src/app/interfaces';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public getHttpOptions() {
    if (this.cookieService.check('authToken')) {
      return {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.cookieService.get('authToken')}`,
        }),
      };
    } else {
      return {
       
      };
    }
  }

  // only works
  works: Work[] = [];

  setWorks(works: Work[]): void {
    this.works = works;
  }

  pushwork(work: Work): void {
    this.works.push(work);
  }

  deleteWork(id: string): void {
    this.works = this.works.filter((item) => item._id != id);
  }

  updateWork(work: Work): void {
    this.works = this.works.map((single) => {
      if (work._id == single._id) {
        return work;
      } else {
        return single;
      }
    });
  }
  // end works

  // to server
  getWorks(): Observable<Work[]> {
    return this.http.get<Work[]>(`${backURL}projects`, this.getHttpOptions());
  }

  postWork(work: any) {
    return this.http.post<any>(
      `${backURL}projects`,
      work,
      this.getHttpOptions()
    );
  }

  deletePermanent(_id: string): Observable<any> {
    return this.http.delete<any>(
      `${backURL}projects/${_id}`,
      this.getHttpOptions()
    );
  }

  putWork(work: any): Observable<any> {
    return this.http.put<any>(
      `${backURL}projects`,
      work,
      this.getHttpOptions()
    );
  }

  setFeatured(_id: string): Observable<any> {
    return this.http.put<any>(
      `${backURL}projects/setfeatured`,
      { _id: _id },
      this.getHttpOptions()
    );
  }

  getAuth(username: string, password: string): Observable<{ token: string, status:number }> {
    return this.http.post<{ token: string, status:number }>(`${backURL}authentication`, {
      user: username,
      pass: password,
    },{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });

  }
}
