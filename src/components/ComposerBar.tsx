import React, { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

interface Props {
    onSend: (text: string) => void;
}
export const ComposerBar = ({ onSend }: Props) => {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (text.trim()) {
            onSend(text.trim());
            setText("");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="Ask me anything..."
                placeholderTextColor="#999"
            />
            <TouchableOpacity 
                style={[styles.sendButton, !text.trim() && styles.disabledButton]} 
                onPress={handleSend}
                disabled={!text.trim()}
            >
                <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 12,
        borderTopWidth: 1,
        borderColor: '#E5E5E5',
        backgroundColor: '#FFF',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        color: '#000',
    },
    sendButton: {
        marginLeft: 12,
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    disabledButton: {
        backgroundColor: '#A0CFFF',
    },
    sendText: {
        color: '#FFF',
        fontWeight: 'bold',
    }
});