import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './my-icons.js';
import './components/home-view.js';
import './components/app-footer.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class GameleonApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #F1942F;
          --app-dark-color: #22180e;
          --app-secondary-color: black;
          display: block;
        }

        .masthead {
          color: #fff;
          background-color: var(--app-dark-color);
          height: 80px;
          display: flex;
          flex-flow: row nowrap;
        }

        .masthead paper-icon-button {
          --paper-icon-button-ink-color: white;
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
          color: white;
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
          color: white;
        }

        .drawer-list a:focus {
          color: white;
        }

        .drawer-list a.iron-selected {
          color: white;
          font-weight: normal;
        }

        @media (max-width: 640px) {
          .masthead paper-icon-button{
             display: block;
          }

          .toolbar {
            display: none;
          }

          .logo-box {
            padding-left: 0.5em;
          }
          .main-logo {
            font-size: 100%;
          }
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <header class="masthead">
        <div class="logo-box">
          <paper-icon-button icon="my-icons:menu"></paper-icon-button>
          <div main-title="" class="main-logo">
            <a name="view1" href="[[rootPath]]view1">GAMELEON APP</a>
          </div>
        </div>
        <div class="toolbar">
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
              <a name="view1" href="[[rootPath]]view1">Login</a>
              <a name="view2" href="[[rootPath]]view2">Register</a>
              <a name="view3" href="[[rootPath]]view3">Browse Games</a>
          </iron-selector>
        </div>
      </header>

      <main>
        <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
          <my-view1 name="view1"></my-view1>
          <my-view2 name="view2"></my-view2>
          <my-view3 name="view3"></my-view3>
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
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'view1';
    } else if (['view1', 'view2', 'view3'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }

    // Close a non-persistent drawer when the page & route are changed.
  /*   if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    } */
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'view1':
        import('./my-view1.js');
        break;
      case 'view2':
        import('./my-view2.js');
        break;
      case 'view3':
        import('./my-view3.js');
        break;
      case 'view404':
        import('./my-view404.js');
        break;
    }
  }
}

window.customElements.define('gameleon-app', GameleonApp);
