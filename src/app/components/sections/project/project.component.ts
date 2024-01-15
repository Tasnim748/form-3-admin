import { Component, inject, TemplateRef, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http'
import {  Work, placeHolderThumb } from 'src/app/interfaces';

import { MainService } from 'src/app/services/main-service/main.service';
import _default from '@popperjs/core/lib/modifiers/popperOffsets';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  get works(): Work[] {
    return this.mainService.works;
  }

  constructor(
    private http: HttpClient,
    private mainService: MainService
  ) {}

  ngOnInit(): void {
    this.mainService.getWorks().subscribe(things => {
      this.mainService.setWorks(things);
    })
  }

  // editor configs
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table code help wordcount',
    promotion: false,
  }

  // all ng models
  title!: string;
  category!: string;

  description_1: string = "";
  img_1!: File|null;

  description_2: string = "";
  img_2!: File|null;

  description_3: string = "";
  img_3_1!: File|null;
  img_3_2!: File|null;
  img_3_3!: File|null;

  description_4: string = "";
  img_4!: File|null;

  // template selection
  whichTemplate!: number; 
  selectTemplate(template: number): void {
    this.whichTemplate = template;
  }

  // Only for modal operations and submissions through modal
  private modalService = inject(NgbModal);
  closeResult = '';


  // add modal
  openModal(content: TemplateRef<any>) {
    this.whichTemplate = 1;
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        fullscreen: true,
        scrollable: true
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          console.log(this.closeResult);

          this.section_1_img = placeHolderThumb;
          this.section_2_img = placeHolderThumb;
          this.section_4_img = placeHolderThumb;
          this.section_3_img_1 = placeHolderThumb;
          this.section_3_img_2 = placeHolderThumb;
          this.section_3_img_3 = placeHolderThumb;

          this.bg_size_1 = 'inherit';
          this.bg_size_2 = 'inherit';
          this.bg_size_4 = 'inherit';
          this.bg_size_3_1 = 'inherit';
          this.bg_size_3_2 = 'inherit';
          this.bg_size_3_3 = 'inherit';

          this.title = "";
          this.category = "";
          this.description_1 = "";
          this.description_2 = "";
          this.description_3 = "";
          this.description_4 = "";

          this.img_1 = null;
          this.img_2 = null;
          this.img_3_1 = null;
          this.img_3_2 = null;
          this.img_3_3 = null;
          this.img_4 = null;

          this.updating = false;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          console.log(this.closeResult);
          
          this.section_1_img = placeHolderThumb;
          this.section_2_img = placeHolderThumb;
          this.section_4_img = placeHolderThumb;
          this.section_3_img_1 = placeHolderThumb;
          this.section_3_img_2 = placeHolderThumb;
          this.section_3_img_3 = placeHolderThumb;

          this.bg_size_1 = 'inherit';
          this.bg_size_2 = 'inherit';
          this.bg_size_4 = 'inherit';
          this.bg_size_3_1 = 'inherit';
          this.bg_size_3_2 = 'inherit';
          this.bg_size_3_3 = 'inherit';

          this.title = "";
          this.category = "";
          this.description_1 = "";
          this.description_2 = "";
          this.description_3 = "";
          this.description_4 = "";

          this.img_1 = null;
          this.img_2 = null;
          this.img_3_1 = null;
          this.img_3_2 = null;
          this.img_3_3 = null;
          this.img_4 = null;

          this.updating = false;
        }
      );
  }
  // end add modal


  // update modal
  updating: boolean = false;
  updatingID!: string;
  openModalUpdate(
    content: TemplateRef<any>,
    title: string,
    description1: string,
    description2: string,
    description3: string,
    description4: string,
    category: string,
    _id: string
  ) {
    this.updating = true;
    this.openModal(content);
    this.whichTemplate = 4;

    this.title = title;
    this.description_1 = description1;
    this.description_2 = description2;
    this.description_3 = description3;
    this.description_4 = description4;
    this.category = category;
    this.updatingID = _id;
    
    console.log(this.whichTemplate);
  }
  // end update modal

  // delete popup
  deletingID!: string;
  openDelete(content: TemplateRef<any>, _id: string) {
    this.deletingID = _id;
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
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          console.log(this.closeResult);
        }
      );
  }
  // delete popup end

  // featured project modal
  openFeatured(content: TemplateRef<any>) {
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
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          console.log(this.closeResult);
        }
      );
  }
  // end featured project modal

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
  


  // for image preview
  section_1_img: string = placeHolderThumb;
  section_2_img: string = placeHolderThumb;
  section_4_img: string = placeHolderThumb;
  section_3_img_1: string = placeHolderThumb;
  section_3_img_2: string = placeHolderThumb;
  section_3_img_3: string = placeHolderThumb;

  bg_size_1: string = 'inherit';
  bg_size_2: string = 'inherit';
  bg_size_4: string = 'inherit';
  bg_size_3_1: string = 'inherit';
  bg_size_3_2: string = 'inherit';
  bg_size_3_3: string = 'inherit';

  getImagePreview(event: any, which: string) {
    switch(which) {
      case 'sec_1':
        this.img_1 = event.target.files[0];
        console.log(this.img_1);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.section_1_img = imgUrl;
          this.bg_size_1 = 'cover'
        } catch(e) {
          this.section_1_img = placeHolderThumb;
          this.bg_size_1 = 'inherit';
        }
        break
      case 'sec_2':
        this.img_2 = event.target.files[0];
        console.log(this.img_2);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.section_2_img = imgUrl;
          this.bg_size_2 = 'cover'
        } catch(e) {
          this.section_2_img = placeHolderThumb;
          this.bg_size_2 = 'inherit';
        }
        break
      case 'sec_4':
        this.img_4 = event.target.files[0];
        console.log(this.img_4);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.section_4_img = imgUrl;
          this.bg_size_4 = 'cover'
        } catch(e) {
          this.section_4_img = placeHolderThumb;
          this.bg_size_4 = 'inherit';
        }
        break
      case 'sec_3_1':
        this.img_3_1 = event.target.files[0];
        console.log(this.img_3_1);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.section_3_img_1 = imgUrl;
          this.bg_size_3_1 = 'cover'
        } catch(e) {
          this.section_3_img_1 = placeHolderThumb;
          this.bg_size_3_1 = 'inherit';
        }
        break
      case 'sec_3_2':
        this.img_3_2 = event.target.files[0];
        console.log(this.img_3_2);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.section_3_img_2 = imgUrl;
          this.bg_size_3_2 = 'cover'
        } catch(e) {
          this.section_3_img_2 = placeHolderThumb;
          this.bg_size_3_2 = 'inherit';
        }
        break
      case 'sec_3_3':
        this.img_3_3 = event.target.files[0];
        console.log(this.img_3_3);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.section_3_img_3 = imgUrl;
          this.bg_size_3_3 = 'cover'
        } catch(e) {
          this.section_3_img_3 = placeHolderThumb;
          this.bg_size_3_3 = 'inherit';
        }
        break
    }
  }
  // end image preview


  // submit and send
  isLoading: boolean = false;

  submitThings(template: string) {
    this.isLoading = true;
    let formData: FormData = new FormData();
    
    if (this.img_1 && this.img_2 && this.img_3_1 && this.img_3_2 && this.img_3_3 && this.img_4) {
      formData.append('imgs', this.img_1);
      formData.append('imgs', this.img_2);
      formData.append('imgs', this.img_3_1);
      formData.append('imgs', this.img_3_2);
      formData.append('imgs', this.img_3_3);
      formData.append('imgs', this.img_4);
      
      formData.append('title', this.title);
      formData.append('category', this.category);
      formData.append('template', template);

      formData.append('description1', this.description_1);
      formData.append('description2', this.description_2);
      formData.append('description3', this.description_3);
      formData.append('description4', this.description_4);

      switch(template) {
        case 'template1':
        if (
          this.title &&
          this.category &&
          this.description_1 &&
          this.description_2 &&
          this.description_3 &&
          this.description_4
        ) {
          
        } else {
          alert('All fields are required!');
          this.isLoading = false;
          return;
        }
        break;

        case 'template2': case 'template3':
        if (
          this.title &&
          this.category &&
          this.description_1 &&
          this.description_2
        ) {
          
        } else {
          alert('All fields are required!');
          this.isLoading = false;
          return;
        }
        break;
      }

      this.mainService.postWork(formData).subscribe((resp: any) => {
        console.log(resp);
        this.mainService.pushwork(resp.data);
  
        this.isLoading = false;
        this.modalService.dismissAll('Close');
      });
    } else {
      alert('All fields are required');
      this.isLoading = false;
    }
  }

  updateThings() {
    this.mainService.putWork({
      title: this.title,
      description1: this.description_1,
      description2: this.description_2,
      description3: this.description_3,
      description4: this.description_4,
      category: this.category,
      _id: this.updatingID
    }).subscribe(see => {
      this.mainService.updateWork(see.data);
      this.modalService.dismissAll('Updated successfully')
    });
  }

  mainDelete(_id: string) {
    this.mainService.deletePermanent(_id).subscribe(see => {
      this.mainService.deleteWork(_id);
      this.modalService.dismissAll('Project Deleted')
    })
  }

  featuredID!: string;

  setFeatured() {
    console.log(this.featuredID);
    this.mainService.setFeatured(this.featuredID).subscribe(resp => {
      console.log(resp);
      this.modalService.dismissAll('featured set');
    });
  }
}