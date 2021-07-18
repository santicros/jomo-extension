import '../global.css';
import './style.css';
import './components/youtube-options';
import './components/twitter-options';

import { interpret } from 'xstate';

import { machine, machineWithActions } from './global.machine';
import { ChangeEventPayload, ConfigKey, isProd } from './utils';

const youtubeEl = document.querySelector('youtube-options');
const twitterEl = document.querySelector('twitter-options');

// import { inspect } from '@xstate/inspect';

// inspect({
//   iframe: false,
// });

const service = interpret(isProd ? machineWithActions : machine, {
  devTools: true,
})
  .onTransition((state) => {
    if (state.changed) {
      if (youtubeEl)
        youtubeEl.youtubeConfig = service.state.context.youtubeConfig;
      if (twitterEl) twitterEl.config = service.state.context.twitterConfig;
    }
  })
  .start();

const getChangedValue = (target: HTMLInputElement) => {
  if (target.type !== 'checkbox' && target.type !== 'radio') return;
  if (target.type === 'checkbox') {
    return {
      property: target.id,
      value: target.checked,
    } as ChangeEventPayload;
  } else if (target.type === 'radio') {
    return {
      property: target.name,
      value: target.dataset.value,
    } as ChangeEventPayload;
  }
};

const onInputChange = (e: Event, source: ConfigKey) => {
  if (e.target instanceof HTMLInputElement) {
    const changed = getChangedValue(e.target);
    if (!changed || changed.property == null || changed.value == null) return;
    service.send('UPDATE_CONFIG', { changed: { ...changed, source } });
  }
};

function main() {
  if (youtubeEl) youtubeEl.youtubeConfig = service.state.context.youtubeConfig;
  if (twitterEl) twitterEl.config = service.state.context.twitterConfig;

  service.send('LOAD_CONFIG');

  youtubeEl?.addEventListener('change', (e) =>
    onInputChange(e, 'youtubeConfig')
  );
  twitterEl?.addEventListener('change', (e) =>
    onInputChange(e, 'twitterConfig')
  );
}

main();
