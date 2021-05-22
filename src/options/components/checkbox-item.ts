import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined';

@customElement('checkbox-item')
export class CheckboxItem extends LitElement {
  protected createRenderRoot() {
    return this;
  }

  @property({ type: String })
  itemName: string | undefined;

  @property({ type: String })
  itemLabel: string | undefined;

  @property({ type: Boolean })
  defaultValue: boolean | undefined;

  onInputChange = (e: { target: HTMLInputElement }) => {
    const property = e.target.id;
    const value = e.target.checked;
    console.log('property:', property);
    console.log('value', value);
  };

  render() {
    return html`<div class="flex items-center">
      <input
        class="order-2"
        type="checkbox"
        name=${ifDefined(this.itemName)}
        id=${ifDefined(this.itemName)}
        @change=${this.onInputChange}
        ?checked=${this.defaultValue}
      />
      <label for=${ifDefined(this.itemName)} class="flex-grow py-2"
        >${this.itemLabel}</label
      >
    </div>`;
  }
}
