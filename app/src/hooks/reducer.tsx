export const Reducer = (state: any, action: any): any => {
  return {
    ...state,
    [action.key]: action.value,
  };
};
