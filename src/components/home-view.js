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

                .hero-bkg {
                    width: 100%;
                    background: url('../../images/hero-main-image.jpg');
                    background-size: cover;
                    min-height: 100vh;
                }

                .hero-content {
                    max-width: 50%;
                    padding: 5em;
                }

                .hero-content img {
                    width: 150px;
                }

                .main-title {
                    color: white;
                    font-size: 4em;
                    font-weight: normal;
                    font-family: 'Alfa Slab One', cursive;
                    line-height: 120%;
                    text-shadow: 1px 1px 8px black;
                }

                .btn {
                    padding: 1em;
                    background: black;
                    color: white;
                    border: 0;
                    cursor: pointer;
                    transition: background .3s ease-in-out;
                }

                .btn:hover {
                    background: var(--app-primary-color);
                }
            </style>
            <div class="hero-bkg">
                <div class="hero-content">
                    <img src="../../images/babeerlians-logo.png" alt="babeerlians logo" width="200">
                    <div>
                        <h1 class="main-title">Are you ready for the challenge?</h1>
                        <button class="btn">START THE JOURNEY!</button>
                    </div>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {

        };
    }



}

customElements.define('home-view', HomeView);