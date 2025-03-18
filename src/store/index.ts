import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { createNoopStorage, encryptTransform } from "./encryptTransform";
import { rootReducer, whiteListedState } from "./rootReducer";

const storage =
    typeof window !== "undefined"
        ? createWebStorage("session")
        : createNoopStorage();

const persistConfig = {
    key: "root",
    storage,
    whitelist: whiteListedState,
    transforms: [encryptTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
