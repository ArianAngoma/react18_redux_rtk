import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { RootState } from '../config'
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

