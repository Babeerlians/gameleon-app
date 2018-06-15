import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './my-icons.js';
import './components/app-footer.js';
import './styles/shared-styles.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from './store.js';
import {
  updateVerified,
  updateLogin,
  updateUserData,
} from './actions/auth.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class GameleonApp extends connect(store)(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          width: 100%;
          --app-primary-color: #F1942F;
          --app-dark-color: #22180e;
          --app-error-color: #e84118;
          --app-secondary-color: black;
          --app-success-color: #2ecc71;
          --app-light-color: #f5f6fa;
        }

        .masthead {
          color: #fff;
          background-color: var(--app-dark-color);
          height: 80px;
          width: 100%;
          display: flex;
          flex-flow: row nowrap;
        }

        .masthead paper-icon-button {
          --paper-icon-button-ink-color: var(--app-light-color);
          display: none;
        }

        .logo-box {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex: 1;
          padding-left: 2em;
        }

        .main-logo {
          font-family: 'Alfa Slab One', cursive;
          font-weight: normal;
          font-size: 1.5em;
        }

        .main-logo a {
          color: var(--app-light-color);
          text-decoration: none;
        }

        .toolbar .drawer-list {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          height: 100%;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: inline-block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-primary-color);
          line-height: 40px;
          transition: color .3s ease-in-out;
        }

        .drawer-list a:hover {
          color: var(--app-light-color);
        }

        .drawer-list a:focus {
          color: var(--app-light-color);
        }

        .drawer-list a.iron-selected {
          color: var(--app-light-color);
          font-weight: normal;
        }

        .toolbar_responsive {
          display: none;
        }

        .mobile_menu {
          display: none;
        }
        
        .imageAvatar {
          width: 40px;
          border-radius: 50%;
          margin-left: 10px;
        }


        @media (max-width: 768px) {
          :host {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            min-height: 100%;
          }

          main {
            flex: 1 0 100vh;
          }
          .masthead paper-icon-button{
             display: block;
             margin-right: 10px;
             transition: color .3s ease-in-out;
          }

          .masthead paper-icon-button:hover {
            color: var(--app-primary-color);
          }

          .toolbar {
            display: none;
          }

          .logo-box {
            padding-left: 0.5em;
          }
          .main-logo {
            font-size: 100%;
            padding-left: .5em;
            flex: 1;
          }

          .toolbar_responsive {
            display: block;
            position: absolute;
            top: 80px;
            width: 100%;
            height: 100vh;
            background: var(--app-primary-color);
            height: auto;
            padding: 0;
            margin: 0;
            z-index: 9999999;
          }

          .toolbar_responsive ul {
            padding: 0px;
            margin: 0;        
          }

          .toolbar_responsive li {
            list-style-type: none;
            border-bottom: 1px dotted var(--app-dark-color);
            padding: 1em;
          }

          .toolbar_responsive li a {
            text-decoration: none;
            color: var(--app-dark-color);
          }

        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <header class="masthead">
        <div class="logo-box">
          <div main-title="" class="main-logo">
            <a name="home" href="[[rootPath]]home">GAMELEON APP</a>
          </div>
          <paper-icon-button icon="my-icons:menu" on-click="_toggleMenu"></paper-icon-button>
        </div>
        <div class="toolbar">
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
              <a name="home" href="[[rootPath]]home">Home</a>
              <template is="dom-if" if="[[!_logged]]">
                <a name="login" href="[[rootPath]]login">Login</a>
                <a name="register" href="[[rootPath]]register">Register</a>
              </template>
              
              <template is="dom-if" if="[[_logged]]">
              <a name="browse" href="[[rootPath]]browse">Browse Games</a>
                <a href="#" on-tap="signOut">Sign out</a>
              </template>
              <template is="dom-if" if="[[_logged]]">
                <p>{{_user.name}}</p>
                <img class="imageAvatar" src="{{_user.avatar}}" alt="{{_user.name}}">
              </template>
          </iron-selector>
        </div>
      </header>

      <template is="dom-if" if="{{isMenuOpened}}">
        <div class="toolbar_responsive">
            <ul>
              <li><a name="home" href="[[rootPath]]home" on-click="_toggleMenu">Home</a></li>
              <template is="dom-if" if="[[!_logged]]">
                 <li><a name="login" href="[[rootPath]]login" on-click="_toggleMenu">Login</a></li>
                 <li><a name="register" href="[[rootPath]]register" on-click="_toggleMenu">Register</a></li>
              </template>
              <template is="dom-if" if="[[_logged]]">
                 <li><a name="browse" href="[[rootPath]]browse" on-click="_toggleMenu">Browse Games</a></li>
                 <li><a href="#">Sign out</a></li>
              </template>
            </ul>
        </div>
      </template>

      <main>
        <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
          <app-home name="home"></app-home>
          <login-view name="login"></login-view>
          <register-view name="register"></register-view>
          <browse-view name="browse"></browse-view>
          <my-view404 name="view404"></my-view404>
        </iron-pages>
      </main>

      <footer>
        <app-footer></app-footer>
      </footer>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object,
      isMenuOpened: {
        type: Boolean,
        value: false,
      },
      _logged: {
        type: Boolean,
        value: false
      },
      _user: {
        type: Object,
      }
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this.checkSession();
  }

  checkSession(){
    firebase.auth().onAuthStateChanged(function (user) {
      if(user){
        if (user.emailVerified) {
          store.dispatch(updateLogin(true));
          const userProfile = {
            name: user.displayName,
            avatar: user.photoURL
          }
          store.dispatch(updateUserData(userProfile));
        }
      }
    });
  }

  signOut(e){
    e.preventDefault();
    firebase.auth().signOut().then(function () {
      store.dispatch(updateLogin(false));
      this.set('route.path', '/login');
    }.bind(this)).catch(function (error) {
      console.error(error);
    });
  }
  

  _routePageChanged(page) {
    if (!page) {
      this.page = 'home';
    } else if (['home', 'login', 'register','browse'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'home':
        import('./views/home-view.js');
        break;
      case 'login':
        import('./views/login-view.js');
        break;
      case 'register':
        import('./views/register-view.js');
        break;
      case 'browse':
        import('./views/browse-view.js');
        break;
      case 'view404':
        import('./views/my-view404.js');
        break;
    }
  }

  _toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  _stateChanged(state) {
    this._verified = state.auth.verified;
    this._logged = state.auth.logged;
    this._user = state.auth.user;
  }
}

window.customElements.define('gameleon-app', GameleonApp);
