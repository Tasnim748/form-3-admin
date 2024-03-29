import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

// styling modules
import { BootstrapModule } from './modules/bootstrap.module';

// components import
import { MainBodyComponent } from './components/main-body/main-body.component';
import { TeamComponent } from './components/sections/team/team.component';
import { ProjectComponent } from './components/sections/project/project.component';
import { TeamCardComponent } from './components/reusables/team-card/team-card.component';
import { StoryComponent } from './components/sections/story/story.component';
import { TestComponent } from './test/test.component';
import { MainService } from './services/main-service/main.service';


@NgModule({
  declarations: [
    AppComponent,
    MainBodyComponent,
    TeamComponent,
    ProjectComponent,
    TeamCardComponent,
    StoryComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BootstrapModule,
    HttpClientModule,
    FormsModule,
    EditorModule,
    DragDropModule
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    CookieService,
    MainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
