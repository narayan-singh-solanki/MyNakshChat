import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import ExperienceRail from '../Experience/ExperienceRail';
import { Message } from '../../types/types';
import { useChatContext } from '../../context/ChatContext';

const MessageBubble = ({ message }: { message: Message }) => {
  const { dispatch } = useChatContext();
  const [showDislikeReasons, setShowDislikeReasons] = useState(false);

  const isUser = message.type === 'user';
  const isAI = message.type === 'ai';

  const handleLongPress = () => {
    Alert.alert('Message Actions', 'Choose an action', [
      {
        text: 'Reply',
        onPress: () => console.log('Reply action clicked'),
      },
      {
        text: 'Copy',
        onPress: () => console.log('Copy action clicked'),
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () =>
          dispatch({ type: 'DELETE_MESSAGE', payload: message.id }),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  if (message.type === 'system') {
    return (
      <View style={styles.systemContainer}>
        <Text style={styles.systemText}>{message.text}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onLongPress={handleLongPress}
        disabled={!isAI}
        activeOpacity={0.8}
      >
        <View
          style={[
            styles.bubble,
            isUser
              ? styles.userBubble
              : message.type === 'human'
              ? styles.humanBubble
              : styles.aiBubble,
          ]}
        >
          <Text style={isUser ? styles.userText : styles.aiText}>
            {message.text}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.loadingContainer}>
        {message?.status === 'sending' && (
          <Text style={styles.loadingState}>Sending...</Text>
        )}
      </View>
      {message.recommendations && message.recommendations.length > 0 && (
        <ExperienceRail experiences={message.recommendations} />
      )}
      {message.type === 'ai' && (
        <View style={{ marginTop: 8 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity onPress={() => console.log('Liked')}>
              <Text>👍</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowDislikeReasons(!showDislikeReasons)}
            >
              <Text>👎</Text>
            </TouchableOpacity>
          </View>
          {showDislikeReasons && (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: 8,
              }}
            >
              {['Inaccurate', 'Too Generic', "Didn't Help", 'Too Long'].map(
                reason => (
                  <TouchableOpacity
                    key={reason}
                    style={styles.dislikeReason}
                    onPress={() => {
                      console.log('Selected reason:', reason);
                      setShowDislikeReasons(false); // hide after selection
                    }}
                  >
                    <Text style={{ fontSize: 12 }}>{reason}</Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 4,
  },
  systemContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  systemText: {
    color: '#666',
    fontSize: 12,
  },
  bubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E9E9EB',
    borderBottomLeftRadius: 4,
  },
  userText: {
    color: '#fff',
  },
  aiText: {
    color: '#000',
  },
  loadingState: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  humanBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFE5B4',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#FFB347',
  },
  dislikeReason: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
 },
});

export default React.memo(MessageBubble);
