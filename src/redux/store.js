import { configureStore } from "@reduxjs/toolkit"
import settingSlicer from "./settingSlicer"

const store = configureStore({
    reducer:{
        setting:settingSlicer
    }
})

export default store