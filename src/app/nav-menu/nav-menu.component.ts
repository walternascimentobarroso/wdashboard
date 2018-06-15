import { Component } from "@angular/core";
import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState
} from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";

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
    constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    }
}
