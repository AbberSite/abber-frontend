import { defineStore } from 'pinia'
import { useWebSocket } from '@vueuse/core';
import type { Message, PaginationResponse } from '~/types';

class ChatStore{
  pagination = ref<PaginationResponse<any>>();



  loading = ref(true);
  chatList = ref<null | HTMLElement>(null);
  messages = ref<Message[]>([]);
  messagesPagination = ref<PaginationResponse<Message>>()
  segmentedMessages = computed<Array<{ index: string, messages: Message[] }>>(() => {

    const segments: Array<{ index: string, messages: Message[] }> = [];

    this.messages.value?.map?.((message) => {

      const date = new Date(message.date).toISOString().split('T')[0];
      
      const existingSegment = segments.find((segment) => segment.index === date);

      if (existingSegment) {
        existingSegment.messages.push(message);
        return;
      }

      segments.push({
        index: date,
        messages: [message]
      })

    });

    return segments.reverse();
  });
fetchMessages = async ( params: any = {}) => {
    this.messagesPagination.value = (await useApi(`/api/chat/messages/`, { params: Object.assign({ ordering: '-date' }, params) })) as PaginationResponse<Message>;
    this.messages.value = this.messagesPagination.value.results
    return this.messages.value;
  }
    constructor() {

  }

}
export const useChatStore = defineStore('chat', () => new ChatStore())