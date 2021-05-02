import { assign, createMachine } from 'xstate';
import { createModel } from 'xstate/lib/model';

const toggleModel = createModel(
  {
    count: 0,
  },
  {
    events: {
      TOGGLE: () => ({}),
    },
  }
);

export const toggleMachine = createMachine<typeof toggleModel>(
  {
    id: 'toggle',
    initial: 'inactive',
    context: toggleModel.initialContext,
    states: {
      inactive: { on: { TOGGLE: 'active' } },
      active: {
        entry: ['increment'],
        on: { TOGGLE: 'inactive' },
      },
    },
  },
  {
    actions: {
      increment: assign({
        count: (context) => context.count + 1,
      }),
    },
  }
);
