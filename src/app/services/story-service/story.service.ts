import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { backURL, Story } from 'src/app/interfaces';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private http: HttpClient) { }

  // only story
  story: Story[] = [];

  
  setStory(story: Story[]): void {
    this.story = story;
  }
  
  pushStory(story: Story): void {
    this.story.push(story);
  }
  
  deleteStory(id: string): void {
    this.story = this.story.filter(item => item._id != id);
  }
  
  updateStory(story: Story): void {
    this.story = this.story.map(single => {
      if (story._id == single._id) {
        return story;
      } else {
        return single;
      }
    });
  }

  // to server
  getStories(): Observable<Story[]> {
    return this.http.get<Story[]>(`${backURL}stories`, httpOptions);
  }
  
  addNew(story: any): Observable<any> {
    return this.http.post<any>(`${backURL}stories`, story);
  }
  
  deletePermanent(_id: string): Observable<any> {
    return this.http.delete<any>(`${backURL}stories`, { body: { _id: _id } });
  }

  putStory(data: any): Observable<any> {
    return this.http.put<any>(`${backURL}stories`, data);
  }
}
