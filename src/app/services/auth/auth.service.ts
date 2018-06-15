import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class AuthService {
    authState: any = null;
    constructor(private afAuth: AngularFireAuth, private router: Router) {
        this.afAuth.authState.subscribe(auth => {
            this.authState = auth;
        });
    }

    authenticated(): boolean {
        return this.authState !== null;
    }

    createLogin() {
        this.afAuth.auth
            .createUserWithEmailAndPassword("walterteste@gmail.com", "password")
            .then(user => {
                console.log(user);
            })
            .catch(error => console.log(error));
    }

    login() {
        localStorage["token"] = "xptoh26410x5=50";
        return this.afAuth.auth
            .signInWithEmailAndPassword("walterteste@gmail.com", "password")
            .then(user => {
                this.authState = user;
                this.router.navigate(["home"]);
            })
            .catch(error => console.log(error));
    }

    logout() {
        localStorage.removeItem("token");
        return this.afAuth.auth
            .signOut()
            .then(() => {})
            .catch(error => console.log(error));
    }
}
