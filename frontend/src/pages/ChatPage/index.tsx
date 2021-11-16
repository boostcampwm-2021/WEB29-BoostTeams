import React, { useState } from 'react';
import ChatTemplate from '@templates/ChatTemplate';

const ChatPage: React.FC = () => {
	const [newChatMode, setNewChatMode] = useState(false);

	return <ChatTemplate newChatMode={newChatMode} />;
};

export default ChatPage;
