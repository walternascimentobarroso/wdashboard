import { Component, OnInit } from "@angular/core";
import { CrudService } from "../../services/crud/crud.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-users",
    templateUrl: "./users.component.html",
    styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
    private PATH = "users";
    users: any;

    constructor(private crudservice: CrudService) {}

    ngOnInit() {
        this.getAll();
        this.create();
    }

    getAll() {
        this.users = this.crudservice.getAll(this.PATH);
        console.log(this.users);
    }

    create() {
        let data = { name: "teste3", password: "123", admin: false };
        this.crudservice.create(this.PATH, data);
    }
}
