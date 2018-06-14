import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    projectname: string = environment.projectname;
    constructor(private afAuth: AngularFireAuth, private router: Router) {}

    ngOnInit() {}

    createLogin() {
        this.afAuth.auth
            .createUserWithEmailAndPassword("walterteste@gmail.com", "password")
            .then(user => {
                console.log(user);
            })
            .catch(error => console.log(error));
    }

    login() {
        return this.afAuth.auth
            .signInWithEmailAndPassword("walter.tir@gmail.com", "p4m3l4")
            .then(user => {
                // this.authState = user;
                // this.updateUserData();
                this.router.navigate(["home"]);
            })
            .catch(error => console.log(error));
    }
}
