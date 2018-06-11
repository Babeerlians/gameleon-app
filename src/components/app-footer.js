import {
    html,
    PolymerElement
} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-styles/shadow.js';
import '../styles/shared-styles.js';

class AppFooter extends PolymerElement {
    static get template() {
        return html `
            <style include="shared-styles">
                :host {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    margin: 0px;
                    padding-left: 2em;
                    background: black;
                    height: 80px;
                    width: 100%;
                    color: white
                }

                .fecha {
                    color: var(--app-primary-color);
                }
            </style>
            <div>
                <p>&copy; <span class="fecha">{{fecha}}</span> by Babeerlians</p>
            </div>
        `;
    }

    static get properties() {
        return {
            fecha: {
                type: Object,
                notify: true,
                value: () => {
                    return new Date().getFullYear();
                }
            }
        };
    }

}

customElements.define('app-footer', AppFooter);