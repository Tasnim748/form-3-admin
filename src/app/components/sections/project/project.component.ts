import { Component, inject, TemplateRef, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http'
import { backURL, Work } from 'src/app/interfaces';

import { MainService } from 'src/app/services/main-service/main.service';

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
    promotion: false
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
  whichTemplate: number = 1; 
  selectTemplate(template: number): void {
    this.whichTemplate = template;
  }

  // Only for modal operations and submissions through modal
  private modalService = inject(NgbModal);
  closeResult = '';

  openModal(content: TemplateRef<any>) {
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
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          console.log(this.closeResult);
          
          this.section_1_img = '../../../../assets/svgs/img-placeholder.svg';
          this.section_2_img = '../../../../assets/svgs/img-placeholder.svg';
          this.section_4_img = '../../../../assets/svgs/img-placeholder.svg';
          this.section_3_img_1 = '../../../../assets/svgs/img-placeholder.svg';
          this.section_3_img_2 = '../../../../assets/svgs/img-placeholder.svg';
          this.section_3_img_3 = '../../../../assets/svgs/img-placeholder.svg';

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
  


  // for image preview
  section_1_img: string = '../../../../assets/svgs/img-placeholder.svg';
  section_2_img: string = '../../../../assets/svgs/img-placeholder.svg';
  section_4_img: string = '../../../../assets/svgs/img-placeholder.svg';
  section_3_img_1: string = '../../../../assets/svgs/img-placeholder.svg';
  section_3_img_2: string = '../../../../assets/svgs/img-placeholder.svg';
  section_3_img_3: string = '../../../../assets/svgs/img-placeholder.svg';

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
          this.section_1_img = '../../../../assets/svgs/img-placeholder.svg';
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
          this.section_2_img = '../../../../assets/svgs/img-placeholder.svg';
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
          this.section_4_img = '../../../../assets/svgs/img-placeholder.svg';
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
          this.section_3_img_1 = '../../../../assets/svgs/img-placeholder.svg';
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
          this.section_3_img_2 = '../../../../assets/svgs/img-placeholder.svg';
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
          this.section_3_img_3 = '../../../../assets/svgs/img-placeholder.svg';
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

      this.http.post(`${backURL}projects`, formData).subscribe((resp: any) => {
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
}