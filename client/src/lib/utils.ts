export function updateKey<S, K extends keyof S>(
    state: S,
    key: K,
    value: S[K],
  ): S {
    return {
      ...state,
      [key]: value,
    };
  }
  
  export type Handlers<T> = {
    [type: string]: (state: T, action: any) => T;
  };

  export function createReducer<S>(handlers: Handlers<S>, initialState: S) {
    return (state: S = initialState, action: any) => {
      const handler = handlers[action.type];
      if (!handler) return state;
      return handler(state, action);
    };
  }