import { Component, inject, TemplateRef, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { StoryService } from 'src/app/services/story-service/story.service';
import { Story } from 'src/app/interfaces';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
  // states
  get stories(): Story[] {
    return this.storyService.story;
  }

  // ng models
  title!: string;
  text1!: string;
  location!: string;
  year: number | undefined;
  text2!: string;
  text3!: string;
  text4!: string;

  image1: File | undefined;
  image2: File | undefined;

  constructor(private storyService: StoryService) {}

  ngOnInit(): void {
    this.storyService.getStories().subscribe((response) => {
      this.storyService.setStory(response);
      console.log(this.stories);
    });
  }

  // editor configs
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table code help wordcount',
    promotion: false,
  };

  // Only for modal operations and submissions through modal
  private modalService = inject(NgbModal);
  closeResult = '';


  // add modal
  openModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'xl',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          console.log(this.closeResult);

          this.updating = false;
          this.title = '';
          this.location = '';
          this.year = undefined;
          this.text1 = '';
          this.text2 = '';
          this.text3 = '';
          this.text4 = '';
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          console.log(this.closeResult);
          this.updating = false;

          this.updating = false;
          this.title = '';
          this.location = '';
          this.year = undefined;
          this.text1 = '';
          this.text2 = '';
          this.text3 = '';
          this.text4 = '';
        }
      );
  }
  // end add modal

  // update modal
  updating: boolean = false;
  updatingID!: string;
  openModalUpdate(
    content: TemplateRef<any>,
    title: any,
    location: any,
    year: any,
    text1: any,
    text2: any,
    text3: any,
    text4: any,
    _id: any
  ) {
    this.updating = true;
    this.title = title;
    this.location = location;
    this.year = year;
    this.text1 = text1;
    this.text2 = text2;
    this.text3 = text3;
    this.text4 = text4;
    this.updatingID = _id;
    
    this.openModal(content);
  }
  // end update modal
  

  // delete modal
  deletingId!: string;
  openDelete(content: TemplateRef<any>, _id: string) {
    this.deletingId = _id;
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'sm',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          console.log(this.closeResult);

          this.updating = false;
          this.title = '';
          this.location = '';
          this.year = undefined;
          this.text1 = '';
          this.text2 = '';
          this.text3 = '';
          this.text4 = '';
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          console.log(this.closeResult);
          this.updating = false;

          this.updating = false;
          this.title = '';
          this.location = '';
          this.year = undefined;
          this.text1 = '';
          this.text2 = '';
          this.text3 = '';
          this.text4 = '';
        }
      );
  }
  // end delete


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



  onImageFieldChange(event: any, which: number) {
    switch (which) {
      case 1:
        this.image1 = event.target.files[0];
        break;
      case 2:
        this.image2 = event.target.files[0];
        break;
      default:
        break;
    }
  }


  // submission
  isLoading: boolean = false;
  onSubmitStory() {
    if (!this.updating) {
      if (
        this.text1 &&
        this.text2 &&
        this.text3 &&
        this.text4 &&
        this.location &&
        this.year &&
        this.image1 &&
        this.image2
      ) {
        this.isLoading = true;
        let newInst = new FormData();
        newInst.append('imgs', this.image1);
        newInst.append('imgs', this.image2);
        newInst.append('title', this.title);
        newInst.append('text1', this.text1);
        newInst.append('text2', this.text2);
        newInst.append('text3', this.text3);
        newInst.append('text4', this.text4);
        newInst.append('location', this.location);
        newInst.append('year', this.year.toString());

        console.log(this.image1, this.image2);

        this.storyService.addNew(newInst).subscribe((response) => {
          console.log(response);
          this.storyService.pushStory(response.data);

          this.title = '';
          this.text1 = '';
          this.text2 = '';
          this.text3 = '';
          this.text4 = '';
          this.location = '';
          this.year = undefined;
          this.image1 = undefined;
          this.image2 = undefined;

          this.isLoading = false;
          this.modalService.dismissAll('Submitted successfully');
        });
      } else {
        alert('All fields are required')
      }
    } else {
      if (
        this.text1 &&
        this.text2 &&
        this.text3 &&
        this.text4 &&
        this.title &&
        this.location &&
        this.year
      ) {
        this.isLoading = true;

        this.storyService
          .putStory({
            title: this.title,
            location: this.location,
            year: this.year,
            text1: this.text1,
            text2: this.text2,
            text3: this.text3,
            text4: this.text4,
            _id: this.updatingID,
          })
          .subscribe((see) => {
            this.storyService.updateStory(see.data);
            this.isLoading = false;
            this.modalService.dismissAll('submitted');
          });
      } else {
        alert('All fields are required!')
      }
    }
  }


  // main delete operation
  deleteThis(_id: string) {
    this.storyService.deletePermanent(_id).subscribe((resp) => {
      console.log(resp);
      this.storyService.deleteStory(_id);
      this.modalService.dismissAll('story deleted')
    });
  }
}
