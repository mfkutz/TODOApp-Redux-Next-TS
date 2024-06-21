import { configureStore } from '@reduxjs/toolkit'
import { taskApi } from './features/taskApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const makeStore = () => {
  return configureStore({
    reducer: {
        [taskApi.reducerPath]: taskApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(taskApi.middleware),
  })
}

setupListeners(makeStore().dispatch)

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']