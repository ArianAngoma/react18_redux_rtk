import { useAppSelector } from './useAppSelector'
import {
  onOpenDateModalReducer,
  onCloseDateModalReducer,
  RootState,
  store, 
  onSetActiveEventReducer,
  Event
} from '../store'

const getIsDateModalOpen = (state: RootState) => state.ui.isDateModalOpen

const getActiveEvent = (state: RootState) => state.ui.activeEvent

const onOpenDateModal = () => store.dispatch(onOpenDateModalReducer())

const onCloseDateModal = () => store.dispatch(onCloseDateModalReducer())

const onSetActiveEvent = (event: Event) => store.dispatch(onSetActiveEventReducer(event))

export const useUIStore = () => {

  const isDateModalOpen = useAppSelector(getIsDateModalOpen)

  const activeEvent = useAppSelector(getActiveEvent)

  return {
    isDateModalOpen,
    activeEvent,
    onOpenDateModal,
    onCloseDateModal,
    onSetActiveEvent
  }

}