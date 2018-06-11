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
                    padding-left: 2em;
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    top: 60%;
                    transform: translateY(-60%);
                }

                .hero-content img {
                    height: 200px;
                    width: auto;
                    padding: 0 2em;
                }

                .main-title {
                    color: white;
                    font-size: 4em;
                    font-weight: normal;
                    font-family: 'Alfa Slab One', cursive;
                    line-height: 120%;
                    text-shadow: 2px 2px 8px black;
                }

                button {
                    padding: 1em;
                    background: black;
                    color: white;
                    border: 0;
                    cursor: pointer;
                    transition: background .3s ease-in-out;
                }

                button:hover, button:focus {
                    background: var(--app-primary-color);
                }

            </style>
            <div class="hero-bkg">
                <div class="hero-content">
                    <img src="../../images/babeerlians-logo.png" alt="babeerlians logo">
                    <div>
                        <h1 class="main-title">Are you ready for the challenge?</h1>
                        <button>START THE JOURNEY!</button>
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