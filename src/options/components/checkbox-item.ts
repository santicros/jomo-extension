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

  @property({ type: String })
  itemDescription: string | undefined;

  @property({ type: Boolean })
  itemDefault: boolean | undefined;

  render() {
    return html`<div class="flex items-center border-b">
      <input
        class="order-2 flex-shrink-0"
        type="checkbox"
        name=${ifDefined(this.itemName)}
        id=${ifDefined(this.itemName)}
        ?checked=${this.itemDefault}
      />
      <label for=${ifDefined(this.itemName)} class="flex-grow py-5 mr-4">
        <span>${this.itemLabel}</span>
        ${this.itemDescription
          ? html`<p class="text-sm opacity-60">${this.itemDescription}</p>`
          : null}
      </label>
    </div>`;
  }
}
