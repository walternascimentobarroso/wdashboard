import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ReportTableDataSource } from './report-table-datasource';
import { CrudService } from "../../services/crud/crud.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: "app-report",
    templateUrl: "./report.component.html",
    styleUrls: ["./report.component.css"]
})
export class ReportComponent implements OnInit {
    private path = "reports";
    reports: any = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: ReportTableDataSource;

    displayedColumns = ['responsible', 'equipment', 'owner', 'action'];

    constructor(private crudservice: CrudService, private router: Router) { }

    ngOnInit() {
        this.getAll();
        this.dataSource = new ReportTableDataSource(this.paginator, this.sort, this.reports);
    }

    getAll() {
        this.crudservice.getAll(this.path).forEach(item => {
            this.reports = item;
            this.dataSource = new ReportTableDataSource(this.paginator, this.sort, this.reports);
        });
    }

    see(data) {
        this.router.navigate(["report-view", data]);
    }

    edit(data) {
        this.router.navigate(["report-form", data]);
    }
}
