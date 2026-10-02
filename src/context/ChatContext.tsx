import React, { Dispatch, createContext, useReducer } from "react";

import {Message} from "../types/types";

export interface ChatContextState {
    messages: Message[];
}

export type ChatAction = 
    | { type: "SET_MESSAGES"; payload: Message[] }
    | { type: "ADD_MESSAGE"; payload: Message }
    | { type: "DELETE_MESSAGE"; payload: string };

export interface ChatContextProps {
    state: ChatContextState;
    dispatch: Dispatch<ChatAction>;
}

export const initialState: ChatContextState = {
    messages: [],
};

const chatReducer = (state: ChatContextState, action: ChatAction): ChatContextState => {
    switch (action.type) {
        case "SET_MESSAGES":
            return { ...state, messages: action.payload };
        case "ADD_MESSAGE":
            return { ...state, messages: [action.payload, ...state.messages] };
        case "DELETE_MESSAGE":
            return {
                ...state,
                messages: state.messages.filter(msg => msg.id !== action.payload)
            };
        default:
            return state;
    }
};

export const ChatContext = createContext<ChatContextProps>({
    state: initialState,
    dispatch: () => null
});

export const useChatContext = () => React.useContext(ChatContext);


export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, initialState);

    return (
        <ChatContext.Provider value={{ state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};