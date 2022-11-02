import { configureStore } from '@reduxjs/toolkit'
import copiaReducer from './EasyCopy/copiarSlice'
export default configureStore({
  reducer: {
    copia: copiaReducer
  },
})