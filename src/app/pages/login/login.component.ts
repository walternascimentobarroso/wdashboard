import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../services/auth/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    projectname: string = environment.projectname;
    hide: boolean = true;
    constructor(private authservice: AuthService) {}

    ngOnInit() {}

    login() {
        this.authservice.login();
    }
}
