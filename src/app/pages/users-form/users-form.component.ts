import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CrudService } from "../../services/crud/crud.service";
import { AuthService } from "../../services/auth/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-users-form",
    templateUrl: "./users-form.component.html",
    styleUrls: ["./users-form.component.css"]
})
export class UsersFormComponent implements OnInit {
    private path = "users";
    hide: boolean = true;
    user: any;
    key: any;
    form: any;

    constructor(private authservice: AuthService, private crudservice: CrudService, private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe(params => {
            this.key = params['key'];
            this.form = new FormGroup({
                name: new FormControl(params['name']),
                email: new FormControl(params['email']),
                password: new FormControl(params['password']),
                admin: new FormControl(params['admin'] == 'false' ? null : params['admin'] )
            });
        });
    }

    onSubmit(): void {
        this.user = {
            name: this.form.get("name").value,
            email: this.form.get("email").value,
            password: this.form.get("password").value,
            admin: this.form.get("admin").value
                ? this.form.get("admin").value
                : false
        };

        if (this.key) {
            this.edit(this.user);
        } else {
            this.create(this.user);
            this.authservice.createLogin(this.user.email, this.user.password);
        }
        this.router.navigate(["users"]);
    }

    create(data) {
        return this.crudservice.create(this.path, data);
    }

    edit(data) {
        return this.crudservice.update(this.path, this.key, data);
    }

    ngOnInit() { }
}
