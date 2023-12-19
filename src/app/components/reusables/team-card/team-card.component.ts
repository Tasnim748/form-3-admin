import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backURL } from 'src/app/interfaces';

import { MainService } from 'src/app/services/main-service/main.service';
import { TeamService } from 'src/app/services/team-service/team.service'
import { StoryService } from 'src/app/services/story-service/story.service';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent {

  // the props
  @Input() serial: number = 1;
  @Input() name: string = "No title";
  @Input() designation: string = 'No designation';
  @Input() photoLink: string = "no image";
  @Input() _id: string = 'no ID'
  @Input() which: string = '';


  constructor(
    private http: HttpClient, 
    private mainService: MainService, 
    private teamService: TeamService, 
    private storyService: StoryService
  ) {}

  deleteThis(_id: string, which: string) {
    this.http.delete(`${backURL}${which}`, { body: { _id: _id } })
      .subscribe((resp: any) => {
        console.log(resp.status);
        if (which == 'projects') {
          this.mainService.deleteWork(_id);
        } else if (which == 'teams') {
          this.teamService.deleteMember(_id);
        } else if (which == 'stories') {
          this.storyService.deleteStory(_id);
        }
      })
  }

}
