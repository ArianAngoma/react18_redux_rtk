import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../app/store's
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
