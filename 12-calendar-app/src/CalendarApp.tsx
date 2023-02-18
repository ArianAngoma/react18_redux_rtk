import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { AppRouter } from './router'

import { persistor, store } from './store'
import { Spinner } from './ui'

const CalendarApp = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={<Spinner/>} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  )

}

export default CalendarApp