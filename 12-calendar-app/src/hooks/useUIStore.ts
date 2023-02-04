import { useAppSelector } from './useAppSelector'
import {
  onOpenDateModalReducer,
  onCloseDateModalReducer,
  RootState,
  store, 
  onSetActiveEventReducer,
  EventToModal,
  onClearActiveEventReducer
} from '../store'

const getIsDateModalOpen = (state: RootState) => state.ui.isDateModalOpen

const getActiveEvent = (state: RootState) => state.ui.activeEvent

const onOpenDateModal = () => store.dispatch(onOpenDateModalReducer())

const onCloseDateModal = () => {  
  store.dispatch(onCloseDateModalReducer())

  store.dispatch(onClearActiveEventReducer())
}

const onSetActiveEvent = (event: EventToModal) => store.dispatch(onSetActiveEventReducer(event))

const onClearActiveEvent = () => store.dispatch(onClearActiveEventReducer())

export const useUIStore = () => {

  const isDateModalOpen = useAppSelector(getIsDateModalOpen)

  const activeEvent = useAppSelector(getActiveEvent)

  return {
    isDateModalOpen,
    activeEvent,
    onOpenDateModal,
    onCloseDateModal,
    onSetActiveEvent,
    onClearActiveEvent
  }

}