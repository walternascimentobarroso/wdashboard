import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CrudService } from "../../services/crud/crud.service";

@Component({
    selector: 'app-report-view',
    templateUrl: './report-view.component.html',
    styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit {
    private path = "reports";
    report: any = [];
    key: any;
    constructor(
        private crudservice: CrudService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.params.subscribe(params => {
            this.key = params["key"];
        });

    }

    ngOnInit() {
        this.getAll();
    }

    getAll() {
        this.report = this.crudservice.get(this.path, this.key).forEach(item => {
            this.report = item;
            console.log(this.report);
        });
    }

}
