import { Component } from "@angular/core";
import { GoogleLogin } from 'nativescript-google-login';
import { Application } from '@nativescript/core';

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent {
    googleLogin: GoogleLogin;

    constructor() {
    }

    init(): void {
        console.log('ACTIVITY', Application.android.foregroundActivity);
        this.googleLogin = new GoogleLogin({
            serverClientId: '1093279712153-m5ggq5i59cogt538c62fg3lss7tforig.apps.googleusercontent.com',
        }, Application.android.foregroundActivity);
    }

    // TODO fetch and send token to api
    login(): void {
        this.googleLogin.login().subscribe(
            (result) => {
                console.log(result);
            }, (error) => {
                console.log(error);
            });
    }

    // TODO
    logout(): void {
        this.googleLogin.logout().subscribe(
            (res) => {
                console.log(res);
            }, (error) => {
                console.log(error);
            });
    }

    // TODO
    silent(): void {
        this.googleLogin.silentLogin().subscribe((result) => {
            console.log(result);
        }, (error) => {
            console.log(error);
        });
    }
}
