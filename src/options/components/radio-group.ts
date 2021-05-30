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
  groupDescription: string | undefined;

  @property({ type: String })
  groupValue: string | undefined;

  render() {
    return html`<fieldset>
      <legend>
        <h3 class="text-sm font-extrabold uppercase tracking-wide">
          ${this.groupLabel}
        </h3>
        <p class="text-sm">${this.groupDescription}</p>
      </legend>
      ${this.options?.length &&
      html`
        <div class="grid gap-2 mt-2">
          ${this.options.map(
            (option) =>
              html`<div class="block relative">
                <input
                  class="absolute top-1/2 left-3 transform -translate-y-1/2 z-10"
                  type="radio"
                  id=${this.groupName + '_' + option.name}
                  name=${ifDefined(this.groupName)}
                  data-value=${option.name}
                  ?checked=${option.name === this.groupValue}
                />
                <label
                  for=${this.groupName + '_' + option.name}
                  class="block p-2 pl-9 rounded"
                >
                  <span>${option.label}</span>
                  ${option.description
                    ? html`<p class="text-sm opacity-60">
                        ${option.description}
                      </p>`
                    : null}
                </label>
              </div>`
          )}
        </div>
      `}
    </fieldset>`;
  }
}
