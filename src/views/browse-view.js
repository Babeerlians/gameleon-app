import '../styles/shared-styles.js';

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

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
            max-width: 300px;
            display: flex;
            flex-flow: column wrap;
            justify-content: center;
            align-items: center;
            background: var(--app-light-color);
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

         @media (max-width: 768px) {
           h1 {
             color: var(--app-light-color);
             font-size: 100%;
           }
         }
      </style>
      <div class="browse_list">
         <h1>Browse games list</h1>
         <div class="games">
            <template is="dom-repeat" items="{{games}}" as="game">
                <div class="game">
                    <img src="{{game.thumbnailUrl}}" alt="game item">
                    <h2>{{game.albumId}}</h2>
                    <p>{{game.title}}</p>
                    <button on-click="showGame">VIEW GAME</button>
                </div>
            </template>
         </div>
         
      </div>
    `;
  }

  static get properties() {
      return {
          games: {
              type: Array,
              value() {
                  return [
                    {
                        albumId: 1,
                        id: 1,
                        title: "accusamus beatae ad facilis cum similique qui sunt",
                        url: "http://placehold.it/600/92c952",
                        thumbnailUrl: "http://placehold.it/150/92c952"
                      },
                      {
                        albumId: 2,
                        id: 2,
                        title: "reprehenderit est deserunt velit ipsam",
                        url: "http://placehold.it/600/771796",
                        thumbnailUrl: "http://placehold.it/150/771796"
                      },
                      {
                        albumId: 3,
                        id: 3,
                        title: "officia porro iure quia iusto qui ipsa ut modi",
                        url: "http://placehold.it/600/24f355",
                        thumbnailUrl: "http://placehold.it/150/24f355"
                      },
                      {
                        albumId: 4,
                        id: 4,
                        title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
                        url: "http://placehold.it/600/d32776",
                        thumbnailUrl: "http://placehold.it/150/d32776"
                      },
                      {
                        albumId: 5,
                        id: 5,
                        title: "natus nisi omnis corporis facere molestiae rerum in",
                        url: "http://placehold.it/600/f66b97",
                        thumbnailUrl: "http://placehold.it/150/f66b97"
                      },
                      {
                        "albumId": 6,
                        id: 6,
                        title: "accusamus ea aliquid et amet sequi nemo",
                        url: "http://placehold.it/600/56a8c2",
                        thumbnailUrl: "http://placehold.it/150/56a8c2"
                      },
                  ]
              }
          }
      }
  }
}

window.customElements.define('browse-view', BrowseView);
