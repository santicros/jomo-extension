import { html, TemplateResult } from 'lit';

export function headerSection(key: string, title: string, isActive: boolean) {
  return html`
    <div
      class="flex items-center justify-between sticky top-0 bg-white/90 z-20 py-2"
    >
      <label for="isActive-${key}" class="flex-1 cursor-pointer">
        <h2 class="inline-block text-3xl font-extrabold">${title}</h2>
      </label>
      <toggle-switch
        sourceKey="isActive"
        inputId="isActive-${key}"
        ?ischecked=${isActive}
      ></toggle-switch>
    </div>
  `;
}

export function expandableCard(title: string, content: TemplateResult) {
  return html`<details open>
    <summary class="text-xl font-extrabold cursor-pointer flex items-center">
      <div class="chevron">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>

      <h1 class="inline ml-1">${title}</h1>
    </summary>
    <div class="mt-2 p-6 border rounded-md">${content}</div>
  </details> `;
}
