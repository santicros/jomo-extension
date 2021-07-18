import { createMachine } from 'xstate';

const machine = createMachine({
  initial: 'idle',
  states: {
    idle: {},
    done: {},
  },
});
console.log('machine', machine);
