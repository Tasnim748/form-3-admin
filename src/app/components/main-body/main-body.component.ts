import { Component } from '@angular/core';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss']
})
export class MainBodyComponent {

  sectionSelected: string|undefined;

  selectSection(which: string|undefined): void {
    this.sectionSelected = which;
  }
}
