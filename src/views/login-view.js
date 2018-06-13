import { PolymerElement, html } from '@polymer/polymer/polymer-element.js'; 
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-input/iron-input.js'
import '@polymer/paper-button/paper-button.js'; 
import '../styles/shared-styles.js';

class LoginView extends PolymerElement {
    static get template() {
        return html`
      <style include="shared-styles">
        :host {
          display: flex;
          flex-flow: column nowrap;
          padding: 0;
          margin: 0 auto;
          color: var(--app-light-color);
          background: linear-gradient(black, var(--app-dark-color));
          width: 100%;
          height: 100%;
          animation: fadingView .8s ease-in-out;
        }

        .page_register {
          flex: 1 0 100vh;
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;
          height: calc(100vh - 100px);
          padding: 0;
          margin: 0 auto;
        }

        .hero_register {
            flex: 1;
            display: block;
            margin: 0;
            padding: 0;
        }

        .hero_register img {
            height: 500px;
            width: auto;
            display: block;
        }

        .alert-success {
            background: var(--app-secondary-color);
            border-radius: 3px;
            color: var(--app-light-color);
            font-size: 1em;
            font-weight: 400;
            padding: 10px;
        }

        .card {
            width: 350px;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: flex-start;
            padding: 1.5em;;
            color: var(--app-dark-color);
            border-radius: 15px; 
            background-color: var(--app-primary-color);
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }

        h1 {
          font-family: 'Alfa Slab One', cursive;
          font-weight: normal;
          font-size: 1.5em;
        }

        input {
            padding: 1em;
            margin-bottom: 0.5em;
            width: 100%;
            display: block;
            color: var(--app-dark-color);
            font-size: 1em;
        }
        paper-button {
            width: 100%;
            margin: 0;
            background: var(--app-dark-color);
            color: var(--app-light-color);
        }

        iron-input {
            width: 90%;
        }

        @media (max-width: 768px) {
            .hero_register {
                display: none;
            }

            .card {
                width: 90%;
            }
        }
      </style>


      <div class="page_register">
            <div class="hero_register">
                <img src="../../images/hero-login.png" alt="hero login">
            </div>
            <div class="card">
                <template is="dom-if" if="[[verify]]">
                    <p class="alert-success">
                    <strong>Recibirás un correo, por favor verifica tu usuario</p>
                </template>

                <h1>Sing in</h1>    
                <iron-input bind-value="{{username}}">
                    <input is="iron-input" placeholder="Username">
                </iron-input>

                <iron-input bind-value="{{password}}">
                    <input is="iron-input" placeholder="Password" type="password">
                </iron-input>
            
                <paper-button raised on-tap="register" class="indigo">CONTINUE</paper-button>
            </div>
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

window.customElements.define('login-view', LoginView);