import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { assign, createMachine } from 'xstate';
import { createModel } from 'xstate/lib/model';

import { useMachine } from './useMachine';

const toggleModel = createModel(
  {
    count: 0,
  },
  {
    events: {
      TOGGLE: () => ({}),
    },
  }
);

const toggleMachine = createMachine<typeof toggleModel>(
  {
    id: 'toggle',
    initial: 'inactive',
    context: toggleModel.initialContext,
    states: {
      inactive: { on: { TOGGLE: 'active' } },
      active: {
        entry: ['increment'],
        on: { TOGGLE: 'inactive' },
      },
    },
  },
  {
    actions: {
      increment: assign({
        count: (context) => context.count + 1,
      }),
    },
  }
);

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
