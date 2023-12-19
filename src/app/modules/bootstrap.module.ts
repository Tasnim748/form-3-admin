import { NgModule } from "@angular/core";

import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        NgbDatepickerModule,
        NgbNavModule,
        NgbModalModule,
        NgbAccordionModule,
        NgbAlertModule
    ]
})
export class BootstrapModule { }