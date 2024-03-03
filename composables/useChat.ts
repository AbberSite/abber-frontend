import { useWebSocket, type UseWebSocketReturn } from '@vueuse/core';
import type { Message } from '~/types';

let currentChat: UseWebSocketReturn<any> | undefined = undefined
export default (type: string = "order") => {
  const { rawToken } = useAuthState();

  const id = useRoute().params.id

  // VITE_WS_URL = wss://test.abber.co
  // const exampleSocket = new WebSocket(
  //  ,
  // );

  // exampleSocket.onopen = (event) => {
  //   exampleSocket.send(JSON.stringify({
  //     message : "Here's some text that the server is urgently awaiting!"
  //   }));

  //   resolve(exampleSocket)
  // };

  if (currentChat) return { ...currentChat, clear: () => currentChat = undefined }

  const { messages, chatList } = storeToRefs(useOrdersStore());

  const chat = useWebSocket(
    import.meta.env.VITE_WS_URL + `/ws/${type}/${id}/` + `?authorization=JWT ${rawToken.value}`,
    {
      autoReconnect: true
    }
  );

  watch(chat.data, (value: string) => {
    const data = JSON.parse(value)
    console.log(data)
    if (data.type === 'chat_message') { // New message added
      const receivedMesssage = data as { message: Message };
      messages.value.unshift(receivedMesssage.message);
      chatList.value.scrollTop = chatList.value.scrollHeight; // Scroll to new messages
    }
    else if (data.type === 'read_message') { // Read existing message
      const readMessage = data as { message: { id: Number } };
      const messageToUpdateIndex = messages.value.findIndex(
        (msg: Message) => msg.id === readMessage.message.id
      ); // Find the message by its ID to update it as read
      if (messageToUpdateIndex !== -1) {
        messages.value[messageToUpdateIndex].read = true; // Update the message as read
      }
    }
  });

  currentChat = chat
  
  return { ...chat, clear: () => currentChat = undefined }
};
