import { useSelector as useSelectorOrigin, useDispatch as useDispatchOrigin, TypedUseSelectorHook } from 'react-redux';

import { RootState, AppDispatch, AppThunk } from './index';

// typed useSelector hook
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorOrigin;

// typed useDispatch hook
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useDispatch = () => useDispatchOrigin<AppDispatch | AppThunk>();
