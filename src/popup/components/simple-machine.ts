import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createMachine, interpret } from 'xstate';

const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } },
  },
});

@customElement('simple-machine')
export class SimpleMachine extends LitElement {
  static styles = css`
    p {
      color: orange;
    }
  `;

  @state()
  service = interpret(toggleMachine).start();

  get state() {
    return this.service.state;
  }
  get send() {
    return this.service.send;
  }

  constructor() {
    super();
    this.service.subscribe(() => {
      this.requestUpdate();
    });
  }

  render() {
    return html`<div>
      <p>Current state: ${this.state.value}</p>
      <button
        @click=${() => {
          this.send('TOGGLE');
        }}
      >
        TOGGLE
      </button>
    </div>`;
  }
}
