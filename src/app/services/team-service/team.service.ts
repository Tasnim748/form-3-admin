import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { backURL, Team } from 'src/app/interfaces';
import { MainService } from '../main-service/main.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient, private mainService: MainService) { }

  // only team
  team: Team[] = [];
  refreshFlag:boolean=false;

  
  setTeam(team: Team[]): void {
    this.team = team;
  }
  
  pushMember(team: Team): void {
    this.team.push(team);
  }
  
  deleteMember(id: string): void {
    this.team = this.team.filter(item => item._id != id);
  }
  
  updateMember(team: Team): void {
    this.team = this.team.map(single => {
      if (team._id == single._id) {
        return team;
      } else {
        return single;
      }
    });
  }
  
  // to server
  getTeam(): Observable<Team[]> {
    return this.http.get<Team[]>(`${backURL}teams`, this.mainService.getHttpOptions());
  }
  
  addNew(team: any): Observable<any> {
    return this.http.post<any>(`${backURL}teams`, team, this.mainService.getHttpOptions());
  }
  
  deletePermanent(_id: string): Observable<any> {
    return this.http.delete<any>(`${backURL}teams/${_id}`,this.mainService.getHttpOptions());
  }

  putMember(data: any): Observable<any> {
    return this.http.put<any>(`${backURL}teams`, data, this.mainService.getHttpOptions())
  }
}
