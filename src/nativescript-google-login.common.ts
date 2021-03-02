import { GoogleLoginResult } from './models/google-login-result';
import { GoogleLoginConfig } from './models/google-login-config';
import { Observable as NsObservable, Application } from '@nativescript/core';
import { Observable } from 'rxjs';

export abstract class Common extends NsObservable {
  protected config: GoogleLoginConfig;
  protected activity: any;
  constructor(config: GoogleLoginConfig, activity?: any) {
    super();
    this.config = config;
    this.activity = activity || Application.android.foregroundActivity || Application.android.startActivity;
    if (!this.activity) {
      throw new Error('No activity');
    }
  }
  abstract login(): Observable<GoogleLoginResult>;
  abstract silentLogin(): Observable<GoogleLoginResult>;
  abstract logout(): Observable<boolean>;
}
