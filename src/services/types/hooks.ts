import { RootState, AppDispatch, AppThunk } from './index';
import { 
  useSelector as useSelectorOrigin,
  useDispatch as useDispatchOrigin,
  TypedUseSelectorHook
} from 'react-redux';

// typed useSelector hook
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorOrigin;

// typed useDispatch hook 
export const useDispatch = () => useDispatchOrigin<AppDispatch | AppThunk>();