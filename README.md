# MyNaksh Frontend Assignment - AI Chat Experience

This is my implementation of the MyNaksh AI Conversation Experience using React Native and TypeScript.

I focused mainly on the chat flow, different message types, AI recommendations, message actions and basic message sending states.

## Setup

```bash
npm install

For iOS
cd ios
pod install
cd ..

Run the app:

npm run ios
or
npm run android
```
## Project Structure
* `src/components/chat/` - Core messaging UI (MessageBubble, ChatList)
* `src/components/Experience/` - Dynamic recommendation rail & cards
* `src/components/ComposerBar.tsx` - Text input and send logic
* `src/context/` - Global state management & Reducers
* `src/data/` - Initial mock payload
* `src/screens/` - Main chat screen container
* `src/types/` - TypeScript interfaces


### How I structured it

AstroChatScreen is the main screen and connects the chat state with the UI.
ChatList is responsible for the rendering the convestation using the FlatList.
MessageBubble handles the different message types like user, Ai, human, and system.

For AI messages, recommendations are rendered separately using ExperienceRail and ExperienceCard. This also allows multiple recommendation cards to be shown in a horizontal list.

ComposerBar handles entering and sending a new message.

ChatContext uses React Context and useReducer to keep conversation state and handle action such as adding and deleting messages.

### State Management
I used React Context with useReducer.

I kept the state simple because the assignment is a small standalone conversation experience and there was no need to introduce a larger state management library.

### Experience Handling
An AI message can contain multiple recommendations.

Each recommendation has a type and The message does not need separate fields for each recommendation type. Instead, recommendations are stored as an array, and the UI renders them using the recommendation type.

### Implemented Interactions
The current implementation includes:
- User, AI, human astrologer and system messages
- Virtualized chat list using FlatList
- Horizontal recommendation cards
- AI like/dislike interaction
- Dislike feedback options
- Long press actions on AI messages
- Reply / Copy / Delete action menu
- Message deletion
- Message composer
- Optimistic message addition
- Sending / Sent message state
- Basic mock AI response

### Performance
For the conversation timeline I used FlatList so the complete message list does not need to be rendered at once.
The horizontal recommendation list also uses FlatList.
I also used React.memo and useCallback in places where list rendering could otherwise create unnecessary renders.

### Trade-offs (Due to Time Constraints)
- Message Actions UI: I utilized React Native's built-in Alert for the long-press actions (Reply, Copy, Delete) rather than building a custom animated Bottom Sheet.
- API Simulation: Backend calls for sending messages are mocked using setTimeout in the component layer rather than a dedicated async thunk/saga layer.