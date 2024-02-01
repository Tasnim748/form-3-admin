import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  selectedImage: string | null = null;
  imageList: string[] = [];

  onImageSelected(event: any): void {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      this.imageList.push(imageUrl);
    }
  }

  deleteImage(index: number): void {
    this.imageList.splice(index, 1);

  }

  displayPreview(index: number): void {
    this.selectedImage = this.imageList[index];
    this.renderSelectedImage();
    console.log('hi')
  }


  renderSelectedImage(): void {
    const selectedImageContainer = document.getElementById('selectedImageContainer');

    if (selectedImageContainer) {
      selectedImageContainer.innerHTML = '';

      if (this.selectedImage) {
        const imgElement = document.createElement('img');
        imgElement.src = this.selectedImage;
        imgElement.alt = 'Selected Image';
        imgElement.classList.add('selected-image');

        selectedImageContainer.appendChild(imgElement);
      }
    }
  }
}
