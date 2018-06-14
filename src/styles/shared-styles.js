/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      .circle {
        display: inline-block;
        width: 64px;
        height: 64px;
        text-align: center;
        color: #555;
        border-radius: 50%;
        background: #ddd;
        font-size: 30px;
        line-height: 64px;
      }

      .alert-success {
            background: var(--app-success-color);
            border-radius: 3px;
            color: var(--app-light-color);
            font-size: 1em;
            font-weight: 400;
            padding: 10px;
      }

      .alert-error {
          background: var(--app-error-color);
          border-radius: 3px;
          color: var(--app-light-color);
          font-size: 1em;
          font-weight: 400;
          padding: 10px;
      }

      @keyframes fadingView {
        0% { opacity: 0 }
        100% { opacity: 100% }
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
