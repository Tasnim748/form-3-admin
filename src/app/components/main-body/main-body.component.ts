import { Component } from '@angular/core';
import { MainService } from 'src/app/services/main-service/main.service';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.scss']
})
export class MainBodyComponent {
  constructor(private mainService: MainService) {}

  sectionSelected: string|undefined;

  selectSection(which: string|undefined): void {
    this.sectionSelected = which;
  }

  username!: string;
  password!: string;
  isAuthenticated: boolean = false;
  onProcess: boolean = false;

  onSubmit(): void {
    if (this.username && this.password) {
      this.onProcess = true;
      this.mainService.getAuth(this.username, this.password).subscribe((response: any) => {
        if (response.status == 200) {
          this.isAuthenticated = true
          this.onProcess = false
        } else {
          this.onProcess = false;
          alert('Wrong username or password!');
        }
        this.username = '';
        this.password = '';
      });
    } else {
      alert('Both fields are required!')
    }
  }

  logout() {
    this.isAuthenticated = false;
  }
}
