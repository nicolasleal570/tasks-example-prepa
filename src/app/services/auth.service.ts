import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { auth } from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  /**
   * METHOD TO LOGIN USING GOOGLE ACCOUNT
   */
  loginWithGoogle(): Promise<void> {
    return this.authLogin(new auth.GoogleAuthProvider())
      .then((response) => {
        if (response) {
          localStorage.setItem('user', JSON.stringify(response));
        }
      })
      .catch((err) => console.log(err));
  }

  /**
   * GET THE CURRENT USER
   */
  getCurrentUser(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  /**
   * USER LOGOUT
   */
  logout(): Promise<void> {
    return this.afAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
      })
      .catch((err) => console.log(err));
  }

  /**
   * RETURN TRUE IF THE USER IS LOGGED IN
   */
  isAuthenticated(): boolean {
    const user: firebase.User =
      JSON.parse(localStorage.getItem('user')) ?? null;

    return user !== null;
  }

  /**
   * LOGIN WITH DIFFERENT FIREBASE PROVIDERS
   * @param provider
   */
  private authLogin(
    provider: firebase.auth.AuthProvider
  ): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithPopup(provider);
  }
}
