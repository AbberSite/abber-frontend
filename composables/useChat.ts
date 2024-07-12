import { useWebSocket, type UseWebSocketReturn } from '@vueuse/core';
import type { Message } from '~/types';

let currentChat: UseWebSocketReturn<any> | undefined = undefined
export default (type: string = "order", isDashSupport: boolean=false, id_support: string='') => {
  const { rawToken } = useAuthState();
  const { data } = useAuth();

  const id = isDashSupport ? id_support : useRoute().params.id ;
// console.log({type, isDashSupport, id_support, id, date: new Date()});
  if (currentChat) return { ...currentChat, clear: () => currentChat = undefined }

  const { messages, chatList } = storeToRefs(useChatStore());

  const chat = useWebSocket(
    useRuntimeConfig().public.WebsocketURL + `/ws/${type}/${id}/` + `?authorization=JWT ${rawToken.value}`,
    {
      // autoReconnect: true, autoClose: true
    }
  );

  watch(chat.data, (value: string) => {
    const parsedData = JSON.parse(value);

    const isMessageFromCurrentUser = data.value.username == parsedData.message.user?.username
    if (parsedData.type === 'chat_message') { // New message added
      const receivedMesssage = parsedData as { message: Message };


      if (receivedMesssage.message.files?.length > 0 && isMessageFromCurrentUser) {
        const messageToUpdateIndex = messages.value.findIndex(
          (msg: Message) => msg.files?.length > 0 && msg.files[0].name == receivedMesssage.message.files[0].name + '.mp3'

        ); // Find the message by its ID to update it as read
        if (messageToUpdateIndex !== -1) {
          // Update the message 
          messages.value[messageToUpdateIndex] = receivedMesssage.message;


        }

      } else {
        messages.value.unshift(receivedMesssage.message);
        if (chatList.value) {
          chatList.value.scrollTop = chatList?.value?.scrollHeight as number; // Scroll to new messages
        }

        if (!isMessageFromCurrentUser){
          chat.send(JSON.stringify({ type: 'read_message', message: receivedMesssage.message.id })); // read message
        }
      }
    }
    else if (parsedData.type === 'read_message') { // Read existing message
      const readMessage = parsedData as { message: { id: Number } };
      const messageToUpdateIndex = messages.value.findIndex(
        (msg: Message) => msg.id === readMessage.message.id
      ); // Find the message by its ID to update it as read
      if (messageToUpdateIndex !== -1) {
        messages.value[messageToUpdateIndex].read = true; // Update the message as read
      }
    }
    else if (parsedData.type === 'delete_message') { // Delete message
      const messageIdToDelete = parsedData as { message: { message: Number } };
      messages.value = messages.value.filter(message => message.id != messageIdToDelete.message);
    }

  });

  currentChat = chat

  return { ...chat, clear: () => currentChat = undefined }
};
