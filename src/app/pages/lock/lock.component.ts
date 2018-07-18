import { Component } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../services/auth/auth.service";

@Component({
    selector: "app-lock",
    templateUrl: "./lock.component.html",
    styleUrls: ["./lock.component.css"]
})
export class LockComponent {
    projectname: string = environment.projectname;
    hide: boolean = true;
    constructor(private authservice: AuthService) {}
    login() {
        this.authservice.login();
    }
}
