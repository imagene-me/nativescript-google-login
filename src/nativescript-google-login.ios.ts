import { ios } from '@nativescript/core/application';
import { Common } from './nativescript-google-login.common';
import { Observable, of, Subscriber } from 'rxjs';
import { GoogleLoginResult } from './models/google-login-result';
import { GoogleLoginConfig } from './models/google-login-config';


export class GoogleLogin extends Common {
  private googleSignIn: GIDSignIn = null;
  private delegate: any = null;

  constructor(config: GoogleLoginConfig, viewController: any) {
    super(config, viewController);
  }

  login(): Observable<GoogleLoginResult> {
    return new Observable<GoogleLoginResult>((subscriber) => {
      const delegate = this.createSignInDelegate(subscriber);
      this.googleSignIn.delegate = delegate;
      this.googleSignIn.presentingViewController = this.activity;
      this.googleSignIn.signIn();
    });
  }

  logout(): Observable<boolean> {
    return of(true);
    // console.log('Starting Logout', LOGTAG_LOGOUT);
    // try {
    //   this.googleSignIn.signOut();
    //   callback();
    //   console.log('[SUCCESS] logging out: ', LOGTAG_LOGOUT);
    // } catch (e) {
    //   callback();
    //   console.log('[ERROR] Logging out: ' + e, LOGTAG_LOGOUT);
    // }
  }

  silentLogin(): Observable<GoogleLoginResult> {
    return of(undefined);
  }

  private createSignInDelegate = (subscriber: Subscriber<GoogleLoginResult>) => {
    if (this.delegate === null) {
      class GoogleSigninDelegate extends NSObject {
        static ObjCProtocols = [GIDSignInDelegate];

        constructor() {
          super();
        }

        signInDidSignInForUserWithError(signIn, user, error: NSError) {
          if (error) {
            subscriber.error(error);
          } else {
            try {
              subscriber.next({
                authCode: user.serverAuthCode
              });
            } catch (error) {
              subscriber.error(error);
            }
          }
        }

        signInDidDisconnectWithUserWithError(signIn, user, error: NSError) {
          try {
            if (error) {
              subscriber.error(error);
            } else {
              // googleSuccessCallback("logOut");
              subscriber.error(new Error('Canceled'));
            }
          } catch (error) {
            subscriber.error(error);
          }
        }

        // signInWillDispatchError(signIn, error) {
        // }

        signInPresentViewController(signIn, viewController) {
          const uiview = ios.rootController;
          uiview.presentViewControllerAnimatedCompletion(
            viewController,
            true,
            null
          );
        }

        signInDismissViewController(signIn, viewController) {
          viewController.dismissViewControllerAnimatedCompletion(
            true,
            null
          );
        }
      }
      this.delegate = new GoogleSigninDelegate();
    } else {
      this.delegate.signInDidSignInForUserWithError = function (signIn, user, error: NSError) {
        if (error) {
          subscriber.error(error);
        } else {
          try {
            subscriber.next({
              authCode: user.serverAuthCode
            });
          } catch (error) {
            subscriber.error(error);
          }
        }
      };

      this.delegate.signInDidDisconnectWithUserWithError = function(signIn, user, error: NSError) {
        try {
          if (error) {
            subscriber.error(error);
          } else {
            // googleSuccessCallback("logOut");
            subscriber.error(new Error('Canceled'));
          }
        } catch (error) {
          subscriber.error(error);
        }
      };
    }
    return this.delegate;
  }

}
