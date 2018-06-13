import '../styles/shared-styles.js';

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class MyView404 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: flex;
          padding: 0;
          margin: 0;
          color: var(--app-light-color);
          width: 100%;
          height: 100%;
          animation: fadingView .8s ease-in-out;
        }

        .page404 {
          background: url('../images/404.jpg');
          background-size: cover;
          background-position: center;
          width: 100%;
          height: calc(100vh - 100px);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        h1 {
          font-family: 'Alfa Slab One', cursive;
          font-weight: normal;
          font-size: 2em;
        }

        a {
          color: var(--app-primary-color);
          text-decoration: none;
          transition: color .3s ease-in-out;
        }

        a:hover, a:focus {
          color: var(--app-error-color);
        }

         @media (max-width: 768px) {
           h1 {
             color: var(--app-light-color);
             font-size: 100%;
           }
         }
      </style>
      <div class="page404">
         <h1>Oops you hit a 404.<br> <a href="[[rootPath]]">Head back to home.</a></h1>
      </div>
    `;
  }
}

window.customElements.define('my-view404', MyView404);
