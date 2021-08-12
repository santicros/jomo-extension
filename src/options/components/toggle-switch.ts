import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
@customElement('toggle-switch')
export class ToggleSwitch extends LitElement {
  protected createRenderRoot() {
    return this;
  }

  @property({ type: Boolean })
  isChecked = false;

  @property()
  inputId = '';

  @property()
  sourceKey = '';

  render() {
    return html`<div
      class="relative inline-block w-12 h-6 ${classMap({
        active: this.isChecked,
      })}"
    >
      <input
        data-source-key=${this.sourceKey}
        id=${this.inputId}
        type="checkbox"
        ?checked=${this.isChecked}
        class="absolute z-20 w-full h-full opacity-0 cursor-pointer"
      />
      <span class="slider absolute inset-0 rounded-full"></span>
      <span
        class="circle absolute z-10 left-0 top-0 bottom-0 w-1/2 h-full rounded-full transform transition-transform"
      ></span>
    </div>`;
  }
}
