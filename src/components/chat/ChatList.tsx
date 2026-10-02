import React, { useCallback } from "react"

import { FlatList } from "react-native";
import { Message } from "../../types/types";
import MessageBubble from "./MessageBubble";

interface Props {
    messages: Message[]
}

const ChatList = (props: Props) => {
    const {messages} = props;

    const renderItem = useCallback(({item}: {item: Message}) => {
        return <MessageBubble message={item} />
    }, [])

    return (
        <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            inverted
            // ListHeaderComponent={}
        />
    )

}

export default React.memo(ChatList);