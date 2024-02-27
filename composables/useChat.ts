import { useWebSocket, type UseWebSocketReturn } from '@vueuse/core';
import type { Message } from '~/types';

let currentChat : UseWebSocketReturn<any>|undefined = undefined
export default (type : string = "order") => {
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

    if(currentChat) return {...currentChat, clear : () => currentChat = undefined }

    const { messages } = storeToRefs(useOrdersStore());

    const chat = useWebSocket(
        import.meta.env.VITE_WS_URL + `/ws/${type}/${id}/` + `?authorization=JWT ${rawToken.value}`,
        {
            autoReconnect: true
        }
    );

    watch(chat.data, (value: string) => {
        const receivedMesssage = JSON.parse(value) as { message: Message };
        messages.value.unshift(receivedMesssage.message);
    
    });

    currentChat = chat

    return {...chat, clear : () => currentChat = undefined }
};
