import { Dispatch } from "react";

export type MessageType = "user" | "ai" | "system" | "human";

export type ExperienceType =
    | "gemstone"
    | "tarot"
    | "consultation"
    | "article"
    | "promotion";

export interface Experience {
    id: string;
    type: ExperienceType;
    title: string;
    subtitle?: string;
} 

export interface Message {
    id: string;
    type: MessageType;
    text: string;
    recommendations?: Experience[];
    status?: 'sending' | 'sent' | 'failed';
}

export interface ChatContextState {
    messages: Message[];
    experiences: Experience[];
}

export interface DefaultContext<T> {
  state: T;
  dispatch: null | Dispatch<any>;
}