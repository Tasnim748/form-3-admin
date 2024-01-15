import { Component, Input, TemplateRef, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { backURL } from 'src/app/interfaces';

import { MainService } from 'src/app/services/main-service/main.service';
import { TeamService } from 'src/app/services/team-service/team.service'
import { StoryService } from 'src/app/services/story-service/story.service';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  isLoading: boolean = false;

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
          this.modalService.dismissAll('member deleted')
        })
  }


  // Only for modal operations and submissions through modal
  private modalService = inject(NgbModal);
  closeResult = '';
  
  // edit modal
  openTeamEditModal(content: TemplateRef<any>) {
    this.modalService
    .open(content, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'lg',
    })
    .result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        console.log(this.name, this.designation);
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      }
    );
  }
  // end edit modal

  // delete modal
  deletingId!: string;
  openDelete(content: TemplateRef<any>, id: string) {
    this.deletingId = id;
    this.modalService
    .open(content, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'sm',
    })
    .result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        console.log(this.name, this.designation);
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      }
    );
  }
  // end delete modal

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
  // end modal operation sector


  // submission
  onSubmitTeam() {
    if (this.name && this.designation) {
      this.isLoading = true;
  
      this.teamService.putMember({
        '_id': this._id,
        'name': this.name,
        'designation': this.designation
      }).subscribe((see) => {
        this.teamService.updateMember(see.data);
        this.name = '';
        this.designation = '';

        this.isLoading = false;
        this.modalService.dismissAll('submitted');
      });
    }
  }

}
