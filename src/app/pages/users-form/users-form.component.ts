import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CrudService } from "../../services/crud/crud.service";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-users-form",
    templateUrl: "./users-form.component.html",
    styleUrls: ["./users-form.component.css"]
})
export class UsersFormComponent implements OnInit {
    private path = "users";
    hide: boolean = true;
    user: any;
    form = new FormGroup({
        name: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        admin: new FormControl()
    });

    constructor(private authservice: AuthService, private crudservice: CrudService, private router: Router) { }

    onSubmit(): void {
        this.user = {
            name: this.form.get("name").value,
            email: this.form.get("email").value,
            password: this.form.get("password").value,
            admin: this.form.get("admin").value
                ? this.form.get("admin").value
                : false
        };
        this.create(this.user);
        this.authservice.createLogin(this.user.email, this.user.password);
        this.router.navigate(["users"]);
    }

    create(data) {
        return this.crudservice.create(this.path, data);
    }

    ngOnInit() { }
}
