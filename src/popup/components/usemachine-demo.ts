import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { toggleMachine } from './toggleMachine';
import { useMachine } from './useMachine';

@customElement('usemachine-demo')
export class UsemachineDemo extends LitElement {
  private toggleService = new useMachine(this, toggleMachine);

  render() {
    return html`<div>
      <h1>useMachine Demo</h1>
      <p>Current state: ${this.toggleService.state.value}</p>
      <p>Active Count: ${this.toggleService.state.context.count}</p>
      <button @click=${() => this.toggleService.send('TOGGLE')}>TOGGLE</button>
    </div>`;
  }
}
