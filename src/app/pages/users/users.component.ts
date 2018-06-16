import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UsersTableDataSource } from './users-table-datasource';
import { CrudService } from "../../services/crud/crud.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: "app-users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
    private path = "users";
    users: any = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: UsersTableDataSource;

    displayedColumns = ['key', 'name', 'action'];

    constructor(private crudservice: CrudService, private router: Router) { }

    ngOnInit() {
        this.getAll();
        this.dataSource = new UsersTableDataSource(this.paginator, this.sort, this.users);
    }

    getAll() {
        this.crudservice.getAll(this.path).forEach(item => {
            this.users = item;
            this.dataSource = new UsersTableDataSource(this.paginator, this.sort, this.users);
        });
    }

    edit(data) {
        this.router.navigate(["users-form", data]);
    }

}
