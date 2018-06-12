/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-input/iron-input.js'
import '@polymer/paper-button/paper-button.js';

class RegisterView extends PolymerElement {
    static get template() {
        return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        .alert-success {
            background: #c6ffba;
            border: 1px solid #36f44f;
            border-radius: 3px;
            color: rgb(51, 51, 51);
            font-size: 14px;
            padding: 10px;
        }
      </style>


      <div class="card">
        <template is="dom-if" if="[[verify]]">
            <p class="alert-success">
            <strong>Recibirás un correo, por favor verifica tu usuario</p>
        </template>
        <h1>Register</h1>    

        <iron-input bind-value="{{username}}">
            <input is="iron-input" placeholder="Username">
        </iron-input>

        <iron-input bind-value="{{password}}">
            <input is="iron-input" placeholder="Password" type="password">
        </iron-input>
        
        <paper-button raised on-tap="register" class="indigo">ENVIAR</paper-button>
      </div>
    `;
    }

    static get properties() {
        return {
            username: {
                type: String,
            },
            password: {
                type: String,
            },
        }
    }

    isBabelEmail(email) {
        return email.endsWith("@babel.es");
    }

    register() {
        console.log("USER");
        if (this.isBabelEmail(this.username)) {
            firebase.auth().createUserWithEmailAndPassword(this.username, this.password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            });

            this.username = '';
            this.password = '';

            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    if (this.isBabelEmail(user.email)) {
                        user.sendEmailVerification();
                        console.log(user);
                        this.unauthenticated = false;
                        this.verify = true;
                    } else {
                        user.delete().then(function () {
                            this.error = 'Tu email es incorrecto, debes pertenecer a Babel ;)'
                            console.log('Usuario borrado');
                        }).catch(function (error) {
                            // An error happened.
                        });
                    }
                } else {
                    // User is signed out.
                    // ...
                }
            }.bind(this));
        } else {
            this.error = 'Tu email es incorrecto, debes pertenecer a Babel ;)'
        }

    }
}

window.customElements.define('register-view', RegisterView);