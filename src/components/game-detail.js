import {
    html,
    PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-styles/shadow.js';
import '../styles/shared-styles.js';

class GameDetail extends PolymerElement {
    static get template() {
        return html `
            <style include="shared-styles">
                :host {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0px;
                    width: 100%;
                    min-height: 100%;
                    color: white;
                }

                .game {
                    margin: 1em;
                    flex: 1 0 300px;
                    display: flex;
                    max-width: 250px;
                    flex-flow: column wrap;
                    justify-content: center;
                    align-items: center;
                }

                .game:last-of-type {
                    flex: 0 0 300px;
                }


                .game  img {
                    width: 100%;
                }
                </style>

        <div class="game">
            <h1>DEMO DETAIL</h1>
            <img src="[[item.thumbnailUrl]]" alt="[[item.title]]">
            <h2>[[item.albumId]]</h2>
            <p>[[item.title]]</p> 
        </div>
        `;
    }

    static get properties() {
        return {
            item: {
                type: Object
            }
        };
    }

}

customElements.define('game-detail', GameDetail);