import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '../my-icons.js';
import '../styles/shared-styles.js';
import '../components/game-detail.js';


class BrowseView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: flex;
          margin: 0;
          color: var(--app-dark-color);
          background: linear-gradient(black, var(--app-dark-color));
          width: 100%;
          min-height: 100%;
          animation: fadingView .8s ease-in-out;
        }

        h1 {
          font-family: 'Alfa Slab One', cursive;
          font-weight: normal;
          font-size: 2em;
          text-align: center;
          color: var(--app-light-color);
        }

        a {
          color: var(--app-primary-color);
          text-decoration: none;
          transition: color .3s ease-in-out;
        }

        a:hover, a:focus {
          color: var(--app-secondary-color);
        }

        p {
            font-size: .9em;
            padding: 0 1em;
            padding-bottom: 1em;
            display: block;
            -webkit-margin-before: 0px;
            -webkit-margin-after: 0px;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
        }

        .games {
            width: 100%;
            display: flex;
            flex-flow: row wrap;
            justify-content: center;
            align-items: center;
            padding-left: 0;
        }

        button {
            padding: 1em;
            background: var(--app-primary-color);
            color: var(--app-light-color);
            border: 0;
            width: 100%;
            cursor: pointer;
            transition: background .3s ease-in-out;
        }

        button:hover, button:focus {
            background: var(--app-success-color);
        }

        paper-icon-button {
            position: absolute;
            top: 1em;
            right: 1em;
        }

        a {
            margin: 1em;
            flex: 1 0 300px;
            height: 500px;
            display: flex;
            flex-flow: column wrap;
            justify-content: center;
            align-items: center;
        }

         a:last-of-type {
            flex: 0 0 300px;
        }


         @media (max-width: 768px) {
           h1 {
             color: var(--app-light-color);
             font-size: 100%;
           }
         }
      </style>

      <app-route route="{{subroute}}" pattern="/:id" data="{{data}}"></app-route>

      <template is="dom-if" if="{{isGamesListOpened}}">
            <div class="browse_list">
                <h1>Browse games list</h1>
                <div class="games">
                    <iron-ajax
                            auto
                            url="[[rootPath]]src/data/games.json"
                            handle-as="json"
                            last-response="{{data}}"
                            debounce-duration="300">
                    </iron-ajax>

                    <template is="dom-repeat" items="{{data}}">
                        <!--<a href$="[[_getItemHref(item)]]">
                            <game-detail item="[[item]]"></game-detail>
                        </a>-->
                        <a href$="[[rootPath]]detail/[[item.title]]">
                            <game-detail item="[[item]]"></game-detail>
                        </a>   
                    </template>
                </div>
            </div>
      </template>
      
    `;
  }


  static get properties() {
      return {
          isGamesListOpened: {
              type: Boolean,
              value: true
          }
      }
  }

 
  connectedCallback() {
      super.connectedCallback();
  }

/*   showGame(e) {
      console.log(e.model.game.albumId);
  }
 */
  _getItemHref(item) {
    // By returning null when `itemId` is undefined, the href attribute won't be set and
    // the link will be disabled.
    return item.albumId ? ['browse/games', item.title.toLowerCase().split(' ').join('-')].join('/') : null;
  }


}

window.customElements.define('browse-view', BrowseView);
