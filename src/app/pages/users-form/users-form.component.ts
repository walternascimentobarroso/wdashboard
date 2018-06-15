import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: "app-users-form",
    templateUrl: "./users-form.component.html",
    styleUrls: ["./users-form.component.css"]
})
export class UsersFormComponent implements OnInit {
    user: any;
    userForm = new FormGroup({
        name: new FormControl(),
        email: new FormControl(),
        password: new FormControl(),
        admin: new FormControl()
    });

    constructor() {}

    onFormSubmit(): void {
        this.user = {
            name: this.userForm.get("name").value,
            email: this.userForm.get("email").value,
            password: this.userForm.get("password").value,
            admin: this.userForm.get("admin").value
                ? this.userForm.get("admin").value
                : false
        };
        console.log(this.user);
    }

    ngOnInit() {}
}
