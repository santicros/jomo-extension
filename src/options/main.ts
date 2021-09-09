import '../global.css';
import './style.css';
import './components/youtube-options';
import './components/twitter-options';

// import { inspect } from '@xstate/inspect';
import { interpret } from 'xstate';

import { machine, mockMachine } from './global.machine';
import { ChangeEventPayload, ConfigKey, isProd } from './utils';

// inspect({
//   iframe: false,
//   url: 'https://stately.ai/viz?inspect',
// });

const youtubeEl = document.querySelector('youtube-options');
const twitterEl = document.querySelector('twitter-options');

const service = interpret(isProd ? machine : mockMachine, {
  devTools: !isProd,
})
  .onTransition((state) => {
    if (state.changed) {
      if (youtubeEl)
        youtubeEl.youtubeConfig = service.state.context.youtubeConfig;
      if (twitterEl)
        twitterEl.twitterConfig = service.state.context.twitterConfig;
    }
  })
  .start();

const getChangedValue = (target: HTMLInputElement) => {
  const property = target.dataset.sourceKey;
  if (target.type === 'checkbox') {
    return {
      property,
      value: target.checked,
    } as ChangeEventPayload;
  } else if (target.type === 'radio') {
    return {
      property,
      value: target.dataset.value,
    } as ChangeEventPayload;
  } else if (target.type === 'number') {
    return {
      property,
      value: String(target.valueAsNumber),
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
  if (youtubeEl) youtubeEl.youtubeConfig = service.state.context?.youtubeConfig;
  if (twitterEl) twitterEl.twitterConfig = service.state.context?.twitterConfig;

  service.send('LOAD_CONFIG');

  youtubeEl?.addEventListener('change', (e) => {
    if (e.target.type !== 'checkbox' && e.target.type !== 'radio') return;
    onInputChange(e, 'youtubeConfig');
  });

  youtubeEl?.addEventListener('input', (e) => {
    if (e.target.type !== 'number') return;
    onInputChange(e, 'youtubeConfig');
  });

  twitterEl?.addEventListener('change', (e) => {
    if (e.target.type !== 'checkbox' && e.target.type !== 'radio') return;
    onInputChange(e, 'twitterConfig');
  });
}

main();
