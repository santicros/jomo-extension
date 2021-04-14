/**
 * Util to addCSS to a page
 *
 */
export function addCSS(id: string, css: string) {
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  document.head.appendChild(style);
  style.type = 'text/css';
  style.id = id;
  style.appendChild(document.createTextNode(css));
}

/**
 * Util to patch added CSS to a page
 *
 */
export function patchCSS(id: string, css: string) {
  const style = document.getElementById(id);
  if (!style) return;

  style.replaceChild(document.createTextNode(css), style.childNodes[0]);
}

/**
 * Util to patch or add CSS to a page
 */
export function patchOrAddPatchCSS(id: string, css: string) {
  const style = document.getElementById(id);
  if (!style) {
    addCSS(id, css);
    return;
  }
  patchCSS(id, css);
}
