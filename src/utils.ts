/**
 * Util to addCSS to a page
 *
 */
function addCSS(id: string, css: string) {
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  document.head.appendChild(style);
  style.id = id;
  style.appendChild(document.createTextNode(css));
}

/**
 * Util to patch added CSS to a page
 *
 */
function patchCSS(id: string, css: string) {
  const style = document.getElementById(id);
  if (!style) return;

  style.replaceChild(document.createTextNode(css), style.childNodes[0]);
}

/**
 * Util to patch or add CSS to a page
 */
function patchOrAddPatchCSS(id: string, css: string) {
  const style = document.getElementById(id);
  if (!style) {
    addCSS(id, css);
    return;
  }
  patchCSS(id, css);
}

function documentReady(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
