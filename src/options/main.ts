import '../global.css';
import './style.css';
import './components/youtube-options';

import { interpret } from 'xstate';

import { machine, machineWithActions } from './global.machine';
import { ChangeEventPayload, ConfigKey, isProd } from './utils';

/* 

1. INIT TEMPLATE WITH DEFAULT CONFIG
2. FETCH ALL CONFIGS. GLOBAL, YOUTUBE, TWITTER, FACEBOOK...
3. PASS CONFIG TO TEMPLATE
4. ON INPUT CHANGE, CHANGE CORRESPONDING CONFIG STORAGE.

*/

const youtubeEl = document.querySelector('youtube-options');

const service = interpret(isProd ? machineWithActions : machine)
  .onTransition((state) => {
    if (state.changed) {
      console.log(state);
      if (youtubeEl)
        youtubeEl.youtubeConfig = service.state.context.youtubeConfig;
    }
  })
  .start();

if (youtubeEl) youtubeEl.youtubeConfig = service.state.context.youtubeConfig;
service.send('LOAD_CONFIG');

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

youtubeEl?.addEventListener('change', (e) => onInputChange(e, 'youtubeConfig'));
