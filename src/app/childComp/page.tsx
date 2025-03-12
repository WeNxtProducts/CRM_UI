"use client";

import { useEffect, useState } from "react";

export default function ChildComp() {
    const [messageFromParent, setMessageFromParent] = useState("");
    const [messageToSend, setMessageToSend] = useState("");

    useEffect(() => {

        const handleParentMessage = (event: MessageEvent) => {
            // console.log("event.origin : ", event.origin)
            if (typeof event.data === "object" && event.data.type === "FROM_PARENT_TO_CHILD") {
                setMessageFromParent(event.data.payload);
                console.log("FROM_PARENT_TO_CHILD:", event.data);
            }
        };

        window.addEventListener("message", handleParentMessage);
        return () => {
            window.removeEventListener("message", handleParentMessage);
        };
    }, []);

    const sendMessageToParent = () => {
        window.parent.postMessage(
            { type: "FROM_CHILD_TO_PARENT", payload: messageToSend },
            "http://localhost:8080/"
        );
    };

    return (
        <div className="p-4 border border-gray-300">
            <h2 className="text-lg font-bold mb-4">Child Comp</h2>
            <div className="mb-4">
                <p>Message from parent: {messageFromParent || "No message yet"}</p>
                <input
                    type="text"
                    value={messageToSend}
                    onChange={(e) => setMessageToSend(e.target.value)}
                    className="border p-2 mr-2"
                    placeholder="Type message for parent"
                />
                <button
                    onClick={sendMessageToParent}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Send to Parent
                </button>
            </div>
        </div>
    );
}