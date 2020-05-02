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