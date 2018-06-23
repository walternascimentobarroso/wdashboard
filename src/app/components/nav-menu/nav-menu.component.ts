import { Component } from "@angular/core";
import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState
} from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { environment } from "./../../../environments/environment";
import { AuthService } from "./../../services/auth/auth.service";

declare global {
    interface Document {
        msExitFullscreen: any;
        mozCancelFullScreen: any;
        mozFullScreenElement: any;
        msFullscreenElement: any;
        ALLOW_KEYBOARD_INPUT: any;
    }


    interface HTMLElement {
        msRequestFullscreen: any;
        mozRequestFullScreen: any;
        webkitRequestFullscreen: any;
    }

}

@Component({
    selector: "nav-menu",
    templateUrl: "./nav-menu.component.html",
    styleUrls: ["./nav-menu.component.css"]
})
export class NavMenuComponent {
    logo: string = environment.logopath;
    projectname: string = environment.projectname;
    fullScreenActive: boolean = false;

    isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(
        Breakpoints.Handset
    );
    constructor(private breakpointObserver: BreakpointObserver, public authservice: AuthService) { }

    entrarFullScreen() {
        this.fullScreenActive = true;
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element['ALLOW_KEYBOARD_INPUT']);
            }
        }
    }

    sairFullScreen() {
        this.fullScreenActive = false;
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    logout() {
        this.authservice.logout();
    }
}
