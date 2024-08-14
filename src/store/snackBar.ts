import { create } from 'zustand';

export type SnackBarState = {
  isOpen: boolean;
  autoHideDuration: number;
  message: string;
};

const initialState: SnackBarState = {
  isOpen: false,
  autoHideDuration: 4000,
  message: '',
};
const open = (message: string, autoHideDuration?: number) => {
  const status = get();
  if (autoHideDuration) {
    set({ ...status, isOpen: true, message, autoHideDuration });
  } else {
    set({ ...status, isOpen: true, message });
  }
};

const close = () => {
  set(initialState);
};

export const snackBarActions = {
  open,
  close,
};

const snackBarStore = {
  ...initialState,
  ...snackBarActions,
};

export const useSnackBarStore = create<SnackBarState>(() => snackBarStore);

const set = useSnackBarStore.setState;
const get = useSnackBarStore.getState;
