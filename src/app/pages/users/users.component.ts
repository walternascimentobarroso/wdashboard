import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UsersTableDataSource } from './users-table-datasource';
import { CrudService } from "../../services/crud/crud.service";
import { Observable } from "rxjs";

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

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['key', 'name', 'action'];

    constructor(private crudservice: CrudService) { }

    ngOnInit() {
        this.getAll();
        this.create();
        this.dataSource = new UsersTableDataSource(this.paginator, this.sort, this.users);
    }

    getAll() {
        this.crudservice.getAll(this.path).forEach(item => {
            this.users = item;
            this.dataSource = new UsersTableDataSource(this.paginator, this.sort, this.users);
        });
    }

    create() {
        let data = { name: "teste3", password: "123", admin: false };
        this.crudservice.create(this.path, data);
    }

    delete(key) {
        this.crudservice.delete(this.path, key);
    }
}
