import { Component, inject, TemplateRef, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient } from '@angular/common/http';
import { Work, placeHolderThumb } from 'src/app/interfaces';

import { MainService } from 'src/app/services/main-service/main.service';
import _default from '@popperjs/core/lib/modifiers/popperOffsets';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  car0_images: string[] = [];
  car1_images: string[] = [];

  car_max_limit= 15;

  placeHolderThumbUrl:string = placeHolderThumb;

  selectedImage: string | null = null;
  imageList: string[] = [];

  get works(): Work[] {
    return this.mainService.works;
  }

  constructor(private http: HttpClient, private mainService: MainService, config: NgbCarouselConfig) {
    //config.showNavigationIndicators = false
  }

  OnCarClick(element:string,id:number){
    if(element == 'car0'){
      console.log(this.car0_images[id]);
      this.car0_images.splice(id,1);
      this.car0.splice(id,1);
    }
    else if(element == 'car1'){
      console.log(this.car1_images[id]);
      this.car1_images.splice(id,1);
      this.car1.splice(id,1);
    }
    
  }


  ngOnInit(): void {
    this.mainService.getWorks().subscribe((things) => {
      this.mainService.setWorks(things);
      this.featuredID= this.loadDefaultFeatured()
    }); 
  }

  // editor configs
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table code help wordcount',
    promotion: false,
  };

  // all ng models
  title: string;
  category: string = '';

  description_1: string = '';
  img_1: File | null;

  description_2: string = '';
  img_2: File | null;

  description_3: string = '';
  img_3_1: File | null;
  img_3_2: File | null;
  img_3_3: File | null;

  description_4: string = '';
  img_4: File | null;

  img_7: File | null;
  img_8: File | null;
  img_9: File | null;
  img_10: File | null;
  img_11: File | null;
  img_12: File | null;
  img_13: File | null;

  car0: File[] = [];
  car1: File[]= [];

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
        scrollable: true,
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

          this.title = '';
          this.category = '';
          this.description_1 = '';
          this.description_2 = '';
          this.description_3 = '';
          this.description_4 = '';

          this.img_1 = null;
          this.img_2 = null;
          this.img_3_1 = null;
          this.img_3_2 = null;
          this.img_3_3 = null;
          this.img_4 = null;

          this.img_7 = null;
          this.img_8 = null;
          this.img_9 = null;
          this.img_10 = null;
          this.img_11 = null;
          this.img_12 = null;
          this.img_13 = null;

          this.car0 = []
          this.car1 = []
          this.car0_images = []
          this.car1_images = []



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

          this.title = '';
          this.category = '';
          this.description_1 = '';
          this.description_2 = '';
          this.description_3 = '';
          this.description_4 = '';

          this.img_1 = null;
          this.img_2 = null;
          this.img_3_1 = null;
          this.img_3_2 = null;
          this.img_3_3 = null;
          this.img_4 = null;

          this.img_7 = null;
          this.img_8 = null;
          this.img_9 = null;
          this.img_10 = null;
          this.img_11 = null;
          this.img_12 = null;
          this.img_13 = null;
          this.updating = false;

          this.car0 = []
          this.car1 = []

          this.car0_images = []
          this.car1_images = []
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
    this.whichTemplate = 5;

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

  preview_img_7: string = placeHolderThumb;
  preview_img_8: string = placeHolderThumb;
  preview_img_9: string = placeHolderThumb;
  preview_img_10: string = placeHolderThumb;
  preview_img_11: string = placeHolderThumb;
  preview_img_12: string = placeHolderThumb;
  preview_img_13: string = placeHolderThumb;

  bg_size_1: string = 'inherit';
  bg_size_2: string = 'inherit';
  bg_size_4: string = 'inherit';
  bg_size_3_1: string = 'inherit';
  bg_size_3_2: string = 'inherit';
  bg_size_3_3: string = 'inherit';

  bg_size_7: string = 'inherit';
  bg_size_8: string = 'inherit';
  bg_size_9: string = 'inherit';
  bg_size_10: string = 'inherit';
  bg_size_11: string = 'inherit';
  bg_size_12: string = 'inherit';
  bg_size_13: string = 'inherit';


  getImagePreview(event: any, which: string) {
    switch (which) {
      case 'sec_1':
        this.img_1 = event.target.files[0];
        console.log(this.img_1);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.section_1_img = imgUrl;
          this.bg_size_1 = 'cover';
        } catch (e) {
          this.section_1_img = placeHolderThumb;
          this.bg_size_1 = 'inherit';
        }
        break;
      case 'sec_2':
        this.img_2 = event.target.files[0];
        console.log(this.img_2);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.section_2_img = imgUrl;
          this.bg_size_2 = 'cover';
        } catch (e) {
          this.section_2_img = placeHolderThumb;
          this.bg_size_2 = 'inherit';
        }
        break;
      case 'sec_4':
        this.img_4 = event.target.files[0];
        console.log(this.img_4);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.section_4_img = imgUrl;
          this.bg_size_4 = 'cover';
        } catch (e) {
          this.section_4_img = placeHolderThumb;
          this.bg_size_4 = 'inherit';
        }
        break;
      case 'sec_3_1':
        this.img_3_1 = event.target.files[0];
        console.log(this.img_3_1);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.section_3_img_1 = imgUrl;
          this.bg_size_3_1 = 'cover';
        } catch (e) {
          this.section_3_img_1 = placeHolderThumb;
          this.bg_size_3_1 = 'inherit';
        }
        break;
      case 'sec_3_2':
        this.img_3_2 = event.target.files[0];
        console.log(this.img_3_2);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.section_3_img_2 = imgUrl;
          this.bg_size_3_2 = 'cover';
        } catch (e) {
          this.section_3_img_2 = placeHolderThumb;
          this.bg_size_3_2 = 'inherit';
        }
        break;
      case 'sec_3_3':
        this.img_3_3 = event.target.files[0];
        console.log(this.img_3_3);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.section_3_img_3 = imgUrl;
          this.bg_size_3_3 = 'cover';
        } catch (e) {
          this.section_3_img_3 = placeHolderThumb;
          this.bg_size_3_3 = 'inherit';
        }
        break;
      case 'preview_7':
        this.img_7 = event.target.files[0];
        //console.log(this.img_3_3);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.preview_img_7 = imgUrl;
          this.bg_size_7 = 'cover';
        } catch (e) {
          this.preview_img_7 = placeHolderThumb;
          this.bg_size_7 = 'inherit';
        }
        break;
        case 'preview_8':
        this.img_8 = event.target.files[0];
        //console.log(this.img_3_3);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.preview_img_8 = imgUrl;
          this.bg_size_8 = 'cover';
        } catch (e) {
          this.preview_img_8 = placeHolderThumb;
          this.bg_size_8 = 'inherit';
        }
        break;
        case 'preview_9':
        this.img_9 = event.target.files[0];
        //console.log(this.img_3_3);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.preview_img_9 = imgUrl;
          this.bg_size_9 = 'cover';
        } catch (e) {
          this.preview_img_9 = placeHolderThumb;
          this.bg_size_9 = 'inherit';
        }
        break;
        case 'preview_10':
        this.img_10 = event.target.files[0];
        //console.log(this.img_3_3);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.preview_img_10 = imgUrl;
          this.bg_size_10 = 'cover';
        } catch (e) {
          this.preview_img_10 = placeHolderThumb;
          this.bg_size_10 = 'inherit';
        }
        break;
        case 'preview_11':
        this.img_11 = event.target.files[0];
        //console.log(this.img_3_3);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.preview_img_11 = imgUrl;
          this.bg_size_11 = 'cover';
        } catch (e) {
          this.preview_img_11 = placeHolderThumb;
          this.bg_size_11 = 'inherit';
        }
        break;
        case 'preview_12':
        this.img_12 = event.target.files[0];
        //console.log(this.img_3_3);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.preview_img_12 = imgUrl;
          this.bg_size_12 = 'cover';
        } catch (e) {
          this.preview_img_12 = placeHolderThumb;
          this.bg_size_12 = 'inherit';
        }
        break;
        case 'preview_13':
        this.img_13 = event.target.files[0];
        //console.log(this.img_3_3);
        try {
          let imgUrl = URL.createObjectURL(event.target.files[0]);
          this.preview_img_13 = imgUrl;
          this.bg_size_13 = 'cover';
        } catch (e) {
          this.preview_img_13 = placeHolderThumb;
          this.bg_size_13 = 'inherit';
        }
        break;

        case 'car0':
          this.car0.push(...event.target.files);
        //console.log(this.img_3_3);
          try {
            for(let file of event.target.files){
              this.car0_images.push(URL.createObjectURL(file))
            }
          } catch (e) {
            this.preview_img_12 = placeHolderThumb;
            this.bg_size_12 = 'inherit';
          }
          break;
        case 'car1':
          this.car1.push(...event.target.files);
          //console.log(this.img_3_3);
          try {
            for(let file of event.target.files){
              this.car1_images.push(URL.createObjectURL(file))
            }
          } catch (e) {
            this.preview_img_12 = placeHolderThumb;
            this.bg_size_12 = 'inherit';
          }
          break;
        

    }
  }
  // end image preview

  //start of template4

  // submit and send
  isLoading: boolean = false;

  submitThings(template: string) {
    this.isLoading = true;
    let formData: FormData = new FormData();

    if (
      true
      // this.img_1 &&
      // this.img_2 &&
      // this.img_3_1 &&
      // this.img_3_2 &&
      // this.img_3_3 &&
      // this.img_4 &&
      // this.car0.length !=0 &&
      // this.car0.length !=0
    ) {
      if(this.img_1){
        formData.append('imgs', this.img_1);
      }
      if(this.img_2){
        formData.append('imgs', this.img_2);
      }
      if(this.img_3_1){
        formData.append('imgs', this.img_3_1);
      }
      if(this.img_3_2){
        formData.append('imgs', this.img_3_2);
      }
      if(this.img_3_3){
        formData.append('imgs', this.img_3_3);
      }
      if(this.img_4){
        formData.append('imgs', this.img_4);
      }
      
      

      if (this.img_7) {
        formData.append('imgs', this.img_7);
      }

      if (this.img_8) {
        formData.append('imgs', this.img_8);
      }
      if (this.img_9) {
        formData.append('imgs', this.img_9);
      }
      if (this.img_10) {
        formData.append('imgs', this.img_10);
      }
      if (this.img_11) {
        formData.append('imgs', this.img_11);
      }
      if (this.img_12) {
        formData.append('imgs', this.img_12);
      }
      if (this.img_13) {
        formData.append('imgs', this.img_13);
      }

      for(let i = 0;i<this.car0.length;i++){
        formData.append('car0',this.car0[i])
      }

      console.log(this.car0)

      for(let i = 0;i<this.car1.length;i++){
        formData.append('car1',this.car1[i])
      }
      console.log(this.car1)

      

      formData.append('title', this.title);
      formData.append('category', this.category);
      formData.append('template', template);

      formData.append('description1', this.description_1);
      formData.append('description2', this.description_2);
      formData.append('description3', this.description_3);
      formData.append('description4', this.description_4);

      switch (template) {
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

        case 'template2':
        case 'template3':
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
        case 'template4':
          if (
            this.title &&
            this.category &&
            this.description_1 &&
            this.description_2 &&
            this.description_3
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
    this.isLoading = true;
    this.mainService
      .putWork({
        title: this.title,
        description1: this.description_1,
        description2: this.description_2,
        description3: this.description_3,
        description4: this.description_4,
        category: this.category,
        _id: this.updatingID,
      })
      .subscribe((see) => {
        this.mainService.updateWork(see.data);
        this.modalService.dismissAll('Updated successfully');
      });
      this.isLoading = false;
  }

  mainDelete(_id: string) {
    this.mainService.deletePermanent(_id).subscribe((see) => {
      this.mainService.deleteWork(_id);
      this.modalService.dismissAll('Project Deleted');
    });
  }

  featuredID: string

  loadDefaultFeatured(){
    let featuredWorks = this.works.filter((element)=>{
      if(element.featured){
        return true;
      }
      return false;
    })
    if(featuredWorks.length != 0){
      console.log(this.works)
      console.log(featuredWorks)
      return featuredWorks[0]._id;
    }

    return '';
  }

  setFeatured() {
    console.log(this.featuredID);
    if (this.featuredID == '') {
      return;
    }
    this.mainService.setFeatured(this.featuredID).subscribe((resp) => {
      console.log(resp);
      this.modalService.dismissAll('featured set');
    });
  }


  onImageSelected(event: any): void {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      this.imageList.push(imageUrl);

      this.selectedImage = URL.createObjectURL(file);
    }
  }

  // deleteImage(index: number): void {
  //   this.imageList.splice(index, 1);

  // }

  // displayPreview(index: number): void {
  //   this.selectedImage = this.imageList[index];
  //   this.renderSelectedImage();
  //   console.log('hi')
  // }


  // renderSelectedImage(): void {
  //   const selectedImageContainer = document.getElementById('selectedImageContainer');

  //   if (selectedImageContainer) {
  //     selectedImageContainer.innerHTML = '';

  //     if (this.selectedImage) {
  //       const imgElement = document.createElement('img');
  //       imgElement.src = this.selectedImage;
  //       imgElement.alt = 'Selected Image';
  //       imgElement.classList.add('selected-image');

  //       selectedImageContainer.appendChild(imgElement);
  //     }
  //   }
  // }
}
