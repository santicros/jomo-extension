import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  static styles = css`
    p {
      color: blue;
    }
  `;

  @property()
  name: string = 'Somebody';

  @property({ type: Number })
  counter = 0;

  _doSomething() {
    this.counter++;
  }

  render() {
    return html`<p>Hello, ${this.name}!</p>
      <p>You have clicked ${this.counter} times</p>
      <button @click=${this._doSomething}>Add</button>`;
  }
}
