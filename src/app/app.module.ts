import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

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


@NgModule({
  declarations: [
    AppComponent,
    MainBodyComponent,
    TeamComponent,
    ProjectComponent,
    TeamCardComponent,
    StoryComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BootstrapModule,
    HttpClientModule,
    FormsModule,
    EditorModule
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
