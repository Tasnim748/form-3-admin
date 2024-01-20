import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, inject, TemplateRef, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TeamService } from 'src/app/services/team-service/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  // member infos
  memberName!: string;
  designation!: string;
  memberPhoto: File|null = null;
  priority!: string;

  get team() {
    return this.teamService.team;
  }
  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getTeam().subscribe((got) => {
      this.teamService.setTeam(got);
    });
  }

  // Only for modal operations and submissions through modal
  private modalService = inject(NgbModal);
  closeResult = '';
  

  openModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'lg',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          console.log(this.closeResult);
          console.log(this.memberName, this.designation, this.memberPhoto, this.priority);
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          console.log(this.closeResult);
        }
      );
  }

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

  imageFieldChange(event: any) {
    this.memberPhoto = event.target.files[0];
  }

  // submission
  onSubmitTeam() {
    if (this.memberName && this.designation && this.memberPhoto && this.priority) {
      this.isLoading = true;
      
      let newTeamInst = new FormData();
      newTeamInst.append('name', this.memberName);
      newTeamInst.append('designation', this.designation);
      newTeamInst.append('img', this.memberPhoto);
      newTeamInst.append('priority', this.priority);
  
      this.teamService.addNew(newTeamInst).subscribe((see) => {
        this.teamService.pushMember(see.data);
        this.memberName = '';
        this.designation = '';
        this.memberPhoto = null;
        this.priority = '';

        this.isLoading = false;
        this.modalService.dismissAll('submitted');
      });
    }
  }

  isLoading: boolean = false;


  // onDrop(event: CdkDragDrop<any[]>) {
  //   moveItemInArray(this.team, event.previousIndex, event.currentIndex);
  // }
}
