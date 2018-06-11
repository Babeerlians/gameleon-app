import {
    html,
    PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-styles/shadow.js';
import '../styles/shared-styles.js';

class AppHome extends PolymerElement {
    static get template() {
        return html `
            <style include="shared-styles">
                :host {
                    display: flex;
                    justify-content: center;
                    margin: 0px;
                    padding: 0px;
                    color: white;
                    animation: fadingView .8s ease-in-out;
                }

                .hero-bkg {
                    width: 100%;
                    background: url('../../images/hero-main-image.jpg');
                    background-size: cover;
                    min-height: 100vh;
                }

                .hero-content {
                    max-width: 60%;
                    padding-left: 4em;
                    padding-right: 8em;
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
                    font-size: 3.5em;
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

             @media (max-width: 768px) {
                .hero-bkg {
                    width: 100%;
                    background: url('../../images/hero-main-image.jpg');
                    background-size: cover;
                    background-position: center;
                    min-height:auto;
                    height: 500px;
                }

                .hero-content {
                    width: 100%;
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: center;
                    align-items: center;
                    padding: 0;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                .hero-content img {
                    display: none;
                }

                .claim_box {
                    display: flex;
                    flex-flow: column nowrap;
                }
                .main-title {
                    font-size: 2em;
                    text-align: center;
                }

                button {
                    margin: 0 auto;
                }
            }
            </style>
            <div class="hero-bkg">
                <div class="hero-content">
                    <img src="../../images/babeerlians-logo.png" alt="babeerlians logo">
                    <div class="claim_box">
                        <h1 class="main-title">Are you ready for the challenge?</h1>
                        <button>START THE JOURNEY!</button>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('app-home', AppHome);