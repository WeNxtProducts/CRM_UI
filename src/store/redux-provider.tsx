"use client";

import { Provider } from "react-redux";
import { persistor, store } from "./index";
import { PersistGate } from "redux-persist/integration/react";

export default function ReduxProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}
