import { useSelector as useSelectorOrigin, useDispatch as useDispatchOrigin, TypedUseSelectorHook } from 'react-redux';

import { RootState, AppDispatch, AppThunk } from './index';

// typed useSelector hook
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorOrigin;

// typed useDispatch hook
export const useDispatch = () => useDispatchOrigin<AppDispatch | AppThunk>();
