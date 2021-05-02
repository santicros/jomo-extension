import { ReactiveControllerHost } from 'lit';
import {
  EventObject,
  interpret,
  InterpreterOptions,
  MachineOptions,
  Observer,
  State,
  StateConfig,
  StateMachine,
  Typestate,
} from 'xstate';

export interface UseMachineOptions<TContext, TEvent extends EventObject> {
  /**
   * If provided, will be merged with machine's `context`.
   */
  context?: Partial<TContext>;
  /**
   * The state to rehydrate the machine to. The machine will
   * start at this state instead of its `initialState`.
   */
  state?: StateConfig<TContext, TEvent>;
}

function toObserver<T>(
  nextHandler: Observer<T> | ((value: T) => void),
  errorHandler?: (error: any) => void,
  completionHandler?: () => void
): Observer<T> {
  if (typeof nextHandler === 'object') {
    return nextHandler;
  }

  const noop = () => void 0;

  return {
    next: nextHandler,
    error: errorHandler || noop,
    complete: completionHandler || noop,
  };
}

export class useInterpret<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = { value: any; context: TContext }
> {
  private host: ReactiveControllerHost;
  readonly service;
  private observerOrListener;
  private sub;

  constructor(
    host: ReactiveControllerHost,
    machine: StateMachine<TContext, any, TEvent, TTypestate>,
    options: Partial<InterpreterOptions> &
      Partial<UseMachineOptions<TContext, TEvent>> &
      Partial<MachineOptions<TContext, TEvent>> = {},
    observerOrListener?:
      | Observer<State<TContext, TEvent, any, TTypestate>>
      | ((value: State<TContext, TEvent, any, TTypestate>) => void)
  ) {
    this.host = host;
    host.addController(this);
    this.observerOrListener = observerOrListener;

    const {
      context,
      guards,
      actions,
      activities,
      services,
      delays,
      state: rehydratedState,
      ...interpreterOptions
    } = options;

    const machineConfig = {
      context,
      guards,
      actions,
      activities,
      services,
      delays,
    };

    const machineWithConfig = machine.withConfig(machineConfig, {
      ...machine.context,
      ...context,
    } as TContext);

    this.service = interpret(machineWithConfig, interpreterOptions).start(
      rehydratedState ? (State.create(rehydratedState) as any) : undefined
    );
  }

  hostConnected() {
    if (this.observerOrListener) {
      this.sub = this.service.subscribe(toObserver(this.observerOrListener));
    }
  }

  hostDisconnected() {
    this.service.stop();
    this.sub?.unsubscribe();
  }
}
