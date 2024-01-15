import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { backURL, Work } from 'src/app/interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  // only works
  works: Work[] = [];

  
  setWorks(works: Work[]): void {
    this.works = works;
  }

  pushwork(work: Work): void {
    this.works.push(work);
  }
  
  deleteWork(id: string): void {
    this.works = this.works.filter(item => item._id != id);
  }
  
  updateWork(work: Work): void {
    this.works = this.works.map(single => {
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
    return this.http.get<Work[]>(`${backURL}projects`, httpOptions);
  }

  postWork(work: any) {
    return this.http.post<any>(`${backURL}projects`, work);
  }

  deletePermanent(_id: string): Observable<any> {
    return this.http.delete<any>(`${backURL}projects`, { body: { _id: _id } });
  }

  putWork(work: any): Observable<any> {
    return this.http.put<any>(`${backURL}projects`, work);
  }

  setFeatured(_id: string): Observable<any> {
    return this.http.put<any>(`${backURL}projects/setfeatured`, { _id: _id });
  }

  getAuth(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${backURL}authentication`, {
      'user': username,
      'pass': password
    });
  }

}
