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
    usersClone: any[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: any;

    displayedColumns = ['name', 'email', 'action'];

    constructor(private crudservice: CrudService, private router: Router) { }

    ngOnInit() {
        this.getAll();
        this.dataSource = new UsersTableDataSource(this.paginator, this.sort, this.users);
    }

    applyFilter(val: string) {
        this.users = this.usersClone;
        if (val && val.trim() != '') {
            this.users = this.users.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
        this.dataSource = new UsersTableDataSource(this.paginator, this.sort, this.users);
    }

    getAll() {
        this.crudservice.getAll(this.path).forEach(item => {
            this.users = item;
            this.usersClone = item;
            this.dataSource = new UsersTableDataSource(this.paginator, this.sort, this.users);
        });
    }

    edit(data) {
        this.router.navigate(["users-form", data]);
    }

}
