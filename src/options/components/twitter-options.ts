import './radio-group';
import './checkbox-item';
import './toggle-switch';

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { defaultTwitterConfig } from '../../interventions/twitter/defaults';
import { expandableCard, headerSection } from './globals';

@customElement('twitter-options')
export class TwitterOptions extends LitElement {
  protected createRenderRoot() {
    return this;
  }

  @property({ type: Object })
  twitterConfig = defaultTwitterConfig;

  render() {
    return html`<div>
      ${headerSection('twitter', 'Twitter', this.twitterConfig.isActive)}
      ${this.twitterConfig.isActive
        ? html`<div class="mt-4 space-y-6">
            <section>
              ${expandableCard('Recommendations', 'settings rec')}
            </section>
            <section>${expandableCard('Metrics', 'settings metr')}</section>
            <section>
              ${expandableCard('Distracting Elements', 'settings distr')}
            </section>
          </div>`
        : null}
    </div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'twitter-options': TwitterOptions;
  }
}
