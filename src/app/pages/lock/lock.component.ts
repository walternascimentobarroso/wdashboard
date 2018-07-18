import { Component } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";

@Component({
    selector: "app-lock",
    templateUrl: "./lock.component.html",
    styleUrls: ["./lock.component.css"]
})
export class LockComponent {
    hide: boolean = true;
    constructor(private authservice: AuthService) {}
    login() {
        this.authservice.login();
    }
}
