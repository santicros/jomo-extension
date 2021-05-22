import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined';

@customElement('radio-group')
export class RadioGroup extends LitElement {
  protected createRenderRoot() {
    return this;
  }

  @property({ type: Array })
  options: { name: string; label: string; description?: string }[] | undefined;

  @property({ type: String })
  groupLabel: string | undefined;

  @property({ type: String })
  groupName: string | undefined;

  @property({ type: String })
  defaultValue: string | undefined;

  onInputChange = (e: {
    target: HTMLInputElement;
    dataset?: { value: string };
  }) => {
    const property = e.target.name;
    const value = e.target?.dataset?.value;
    console.log('property:', property);
    console.log('value', value);
  };

  render() {
    return html`<fieldset>
      <legend>
        <h3>${this.groupLabel}</h3>
        <p>Descriptive text</p>
      </legend>
      ${this.options &&
      html`
        <div class="grid gap-2">
          ${this.options.map(
            (option) =>
              html`<div class="block relative">
                <input
                  class="absolute top-1/2 left-3 transform -translate-y-1/2 z-10"
                  type="radio"
                  id=${this.groupName + '_' + option.name}
                  name=${ifDefined(this.groupName)}
                  data-value=${option.name}
                  @change=${this.onInputChange}
                  ?checked=${option.name === this.defaultValue}
                />
                <label
                  for=${this.groupName + '_' + option.name}
                  class="block p-2 pl-9 rounded"
                >
                  <span>${option.label}</span>
                  ${option.description
                    ? html`<p class="text-sm">${option.description}</p>`
                    : null}
                </label>
              </div>`
          )}
        </div>
      `}
    </fieldset>`;
  }
}
