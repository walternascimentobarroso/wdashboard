import { Component } from "@angular/core";
import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState
} from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { environment } from "./../../../environments/environment";
import { AuthService } from "./../../services/auth/auth.service";

@Component({
    selector: "nav-menu",
    templateUrl: "./nav-menu.component.html",
    styleUrls: ["./nav-menu.component.css"]
})
export class NavMenuComponent {
    logo: string = environment.logopath;
    projectname: string = environment.projectname;

    isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(
        Breakpoints.Handset
    );
    constructor(private breakpointObserver: BreakpointObserver, public authservice: AuthService) { }

    logout() {
        this.authservice.logout();
    }
}
