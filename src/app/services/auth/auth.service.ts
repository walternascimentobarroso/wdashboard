import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class AuthService {
    authState: any = null;
    constructor(private afAuth: AngularFireAuth) {

        this.afAuth.authState.subscribe((auth) => {
            this.authState = auth
        });
    }
}
