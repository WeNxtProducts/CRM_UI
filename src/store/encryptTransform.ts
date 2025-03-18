/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTransform } from "redux-persist";
import CryptoJS from "crypto-js";

const secretKey = 'root'; // Use a secure key in production

export const encryptTransform = createTransform(
    // Encrypt inbound state (before persisting)
    (inboundState: any, key: any) => {
        try {
            const stringifiedState = JSON.stringify(inboundState);
            return CryptoJS.AES.encrypt(stringifiedState, secretKey).toString();
        } catch (error) {
            console.error("Encryption error:", error);
            return inboundState;
        }
    },
    // Decrypt outbound state (when rehydrating)
    (outboundState: any, key: any) => {
        try {
            const bytes = CryptoJS.AES.decrypt(outboundState, secretKey);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (error) {
            console.error("Decryption error:", error);
            return outboundState;
        }
    }
);

// Fallback storage for SSR environments
export const createNoopStorage = () => ({
    getItem() {
        return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
        return Promise.resolve(value);
    },
    removeItem() {
        return Promise.resolve();
    },
});
