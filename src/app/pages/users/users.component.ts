import { Component, OnInit } from "@angular/core";
import { CrudService } from "../../services/crud/crud.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
    private path = "users";
    users: any;

    constructor(private crudservice: CrudService) {}

    ngOnInit() {
        this.getAll();
        this.create();
    }

    getAll() {
        this.users = this.crudservice.getAll(this.path);
    }

    create() {
        let data = { name: "teste3", password: "123", admin: false };
        this.crudservice.create(this.path, data);
    }

    delete(key) {
        this.crudservice.delete(this.path, key);
    }
}
