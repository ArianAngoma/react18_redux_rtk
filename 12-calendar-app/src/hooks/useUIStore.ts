import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import { onOpenDateModalReducer, onCloseDateModalReducer } from '../store'

export const useUIStore = () => {

  const dispatch = useAppDispatch()

  const {
    isDateModalOpen
  } = useAppSelector(state => state.ui)

  const onOpenDateModal = () => dispatch(onOpenDateModalReducer())

  const onCloseDateModal = () => dispatch(onCloseDateModalReducer())

  return {
    isDateModalOpen,
    onOpenDateModal,
    onCloseDateModal
  }

}