<template>
  <div class="flex w-full" :dir="isMessageFromCurrentUser ? 'rtl' : 'ltr'">
    <NuxtImg v-if="showUserImage" class="lazyload h-11 w-11 rounded-full bg-gray-100" :src="message.user.image"
      height="44" width="44" alt="" />
    <div class="w-full space-y-3"
      :class="{ 'space-y-3 ms-3': !isLastMessageFromSameUser, 'space-y-2 ms-12': isLastMessageFromSameUser }">
      <div class="w-fit min-w-[4rem] max-w-full space-y-2">
        <div :class="[messageContainerClasses]"
          :style="{ marginRight: isMessageFromCurrentUser && isLastMessageFromSameUser ? '10px' : '', marginLeft: !isMessageFromCurrentUser && isLastMessageFromSameUser ? '10px' : '' }">
          <div v-for="file in message.files" :key="file.id">
            <ChatAudio :file="file" />
          </div>
          <div v-html="message.message"></div>
          <div class="flex justify-end" v-if="message.read && isMessageFromCurrentUser">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" height="10" width="10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
            </svg>
          </div>
        </div>
        <p :dir="isMessageFromCurrentUser ? 'rtl' : 'ltr'" class="text-left text-[13px] text-gray-500"
          v-if="!isLastMessageFromSameUser">
          {{ formatTime(message.date) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User, Message } from '~/types';

const props = defineProps<{
  message: Message,
  user: User,
  lastMessage: Message,
}>();

function formatTime(_date: string) {
  const date = new Date(_date);

  return new Intl.DateTimeFormat('ar-AR', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    numberingSystem: 'latn'
  }).format(date);
}
console.log(props.lastMessage,props.message.message,props.user.username, props.message.user.username)
const isMessageFromCurrentUser = props.user.username === props.message.user.username;
const isLastMessageFromSameUser = props.lastMessage?.user?.username === props.message.user.username;
const showUserImage = !isLastMessageFromSameUser;



const messageContainerClasses = computed(() => {
  return [
    'rounded-lg',
    'rounded-tr-none',
    'px-4',
    'py-4',
    'text-right',
    'text-sm',
    'leading-loose',
    {
      'bg-sky-100': isMessageFromCurrentUser,
      'bg-gray-50': !isMessageFromCurrentUser,
      '-mt-4': isLastMessageFromSameUser,
    }
  ];
});
</script>
