import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createMachine } from 'xstate';

import { useMachine } from './useMachine';

const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } },
  },
});

@customElement('second-machine')
export class SecondMachine extends LitElement {
  private toggleService = new useMachine(this, toggleMachine);

  render() {
    return html`<div>
      <p>Current state: ${this.toggleService.state.value}</p>
      <button @click=${() => this.toggleService.send('TOGGLE')}>TOGGLE</button>
      ${this.toggleService.state.value === 'active'
        ? html`<p>Hey</p>`
        : html`<p>Bye</p>`}
    </div>`;
  }
}
