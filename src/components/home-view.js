import {
    html,
    PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-styles/shadow.js';
import '../styles/shared-styles.js';

class HomeView extends PolymerElement {
    static get template() {
        return html `
            <style include="shared-styles">
                :host {
                    display: flex;
                    justify-content: center;
                    margin: 0px;
                    padding: 0px;
                }

                .hero-image {
                    width: 100%;
                    background: url('../../images/hero-main-image.jpg');
                    background-size: cover;
                    height: 100vh;
                }
            </style>
            <div class="hero-image">
            </div>
        `;
    }

    static get properties() {
        return {

        };
    }



}

customElements.define('home-view', HomeView);