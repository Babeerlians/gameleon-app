import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '../my-icons.js';
import '../styles/shared-styles.js';

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
            justify-content: space-around;
            align-items: center;
            padding-left: 0;
        }

        .game {
            margin: 1em;
            flex: 1 0 300px;
            display: flex;
            flex-flow: column wrap;
            justify-content: center;
            align-items: center;
            background: var(--app-light-color);
        }

        .game:last-of-type {
            flex: 0 0 300px;
        }


        .game img {
            width: 100%;
        }

        button {
            padding: 1em;
            background: var(--app-secondary-color);
            color: var(--app-light-color);
            border: 0;
            width: 100%;
            cursor: pointer;
            transition: background .3s ease-in-out;
        }

        button:hover, button:focus {
            background: var(--app-primary-color);
        }

        .game_box {
            background: green;
            border-radius: 25px;
            padding: 2em;
            width: 90%;
            height: 100vh;
            color: var(--app-light-color);
            margin: 1em auto;
            position: relative;
        }

        paper-icon-button {
            position: absolute;
            top: 1em;
            right: 1em;
        }

         @media (max-width: 768px) {
           h1 {
             color: var(--app-light-color);
             font-size: 100%;
           }
         }
      </style>

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

                <template is="dom-repeat" items="{{data}}" as="game">
                    <div class="game">
                        <img src="{{game.thumbnailUrl}}" alt="game item">
                        <h2>{{game.albumId}}</h2>
                        <p>{{game.title}}</p> 
                        <button on-click="showGame">VIEW GAME</button> 
                    </div>
                </template>
                </div>
            </div>
      </template>
      

      <template is="dom-if" if="{{isGameOpened}}">
          <div class="game_box">
              <paper-icon-button icon="my-icons:close" on-click="closeGameDetails"></paper-icon-button>
              <p>GAME DETAILS BOX</p>
          </div>
      </template>
    `;
  }


  static get properties() {
      return {
          isGameOpened: {
              type: Boolean,
              value: false
          },
          isGamesListOpened: {
              type: Boolean,
              value: true
          }
      }
  }

 
  connectedCallback() {
      super.connectedCallback();
  }

  showGame(e) {
      console.log(e.model.game.albumId);
      this.isGameOpened = true;
      this.isGamesListOpened = false;
  }

  closeGameDetails() {
      this.isGameOpened = false;
      this.isGamesListOpened = true;
  }


}

window.customElements.define('browse-view', BrowseView);
