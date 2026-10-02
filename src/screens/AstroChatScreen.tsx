import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';

import ChatList from '../components/chat/ChatList';
import { ComposerBar } from '../components/ComposerBar';
import { Message } from '../types/types';
import { mockData } from '../data/mockConverstaion';
import { useChatContext } from '../context/ChatContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AstroChatScreen = () => {

    const {state, dispatch} = useChatContext();
    const insets = useSafeAreaInsets();
    const headerHeight = 44 + insets.top;

    useEffect(() => {
        dispatch({ type: "SET_MESSAGES", payload: [...mockData].reverse() });
    }, [dispatch]);

    const onSendHandler = useCallback((text: string) => {
        const newMessageId = Date.now().toString();
        const newUserMgs: Message = {
            id: newMessageId,
            type: 'user',
            text: text,
            status: 'sending'
        };

        dispatch({ 
            type: "SET_MESSAGES", 
            payload: [newUserMgs, ...state.messages] 
        });

        setTimeout(() => {
            dispatch({ 
                type: "SET_MESSAGES",
                payload: [
                    { ...newUserMgs, status: 'sent' },
                    ...state.messages
                ] 
            });
            setTimeout(() => {
                const aiReply: Message = {
                    id: (Date.now() + 1).toString(),
                    type: 'ai',
                    text: 'The stars align with your query. jupiter is currently favoring bold moves.',
                };

                dispatch({
                    type: "SET_MESSAGES",
                    payload: [aiReply, { ...newUserMgs, status: 'sent' }, ...state.messages]
                });
            }, 1000);

        }, 1500);
    }, [state.messages, dispatch]);

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : 0}
        >   
            <View style={styles.dateSeparator}>
                <Text style={styles.dateText}>Today, Oct 2</Text>
            </View>
            <ChatList messages={state.messages} />
            <ComposerBar onSend={onSendHandler} />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    dateSeparator: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    dateText: {
        backgroundColor: '#E8E8E8',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 14,
        color: '#666',
        fontSize: 12,
    },
})

export default AstroChatScreen;