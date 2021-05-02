import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createMachine } from 'xstate';

import { useInterpret } from './useInterpret';

const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } },
  },
});

@customElement('useinterpret-demo')
export class UseinterpretDemo extends LitElement {
  private toggleService = new useInterpret(
    this,
    toggleMachine,
    {},
    (nextState) => {
      console.log(nextState);
      this.requestUpdate();
    }
  );

  render() {
    return html`<div>
      <h1>useInterpret Demo</h1>
      <p>Current state: ${this.toggleService.service.state.value}</p>
      <button @click=${() => this.toggleService.service.send('TOGGLE')}>
        TOGGLE
      </button>
      ${this.toggleService.service.state.value === 'active'
        ? html`<p>Hey</p>`
        : html`<p>Bye</p>`}
    </div>`;
  }
}
