import { useAppSelector } from './useAppSelector'
import {
  onOpenDateModalReducer,
  onCloseDateModalReducer,
  RootState,
  store 
} from '../store'

const getIsDateModalOpen = (state: RootState) => state.ui.isDateModalOpen

const onOpenDateModal = () => store.dispatch(onOpenDateModalReducer())

const onCloseDateModal = () => store.dispatch(onCloseDateModalReducer())

export const useUIStore = () => {

  const isDateModalOpen = useAppSelector(getIsDateModalOpen)

  return {
    isDateModalOpen,
    onOpenDateModal,
    onCloseDateModal
  }

}