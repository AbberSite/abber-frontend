<template>
  <div class="flex w-full" :dir="user.username == message.user.username ? 'rtl' : 'ltr'">
    <NuxtImg class="lazyload h-11 w-11 rounded-full bg-gray-100" v-if="lastMessage?.user?.username != message.user.username" :src="message.user.image" height="44" width="44" alt="" />
    <div class="ms-3 w-full space-y-3" :class="[lastMessage?.user?.username != message.user.username ? 'space-y-3' : 'space-y-2']">
      <div class="w-fit min-w-[4rem] max-w-full space-y-2">
        <div class="rounded-lg rounded-tr-none px-4 py-4 text-right text-sm leading-loose min-w-[5rem]" :class="[user.username == message.user.username ? 'bg-sky-100 ' : 'bg-gray-50 ', lastMessage?.user?.username == message.user.username && '-mt-4', user.username == message.user.username && lastMessage?.user?.username == message.user.username && 'mr-11', user.username != message.user.username && lastMessage?.user?.username == message.user.username && 'ml-11']">
          <div v-for="file in message.files" :key="file.id">
            <ChatAudio :file="file" />
          </div>
          <div v-html="message.message"></div>
          <div class="flex justify-end" v-if="message.read">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="10" width="10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="10" width="10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
            </svg>
          </div>
        </div>

        <p :dir="user.username == message.user.username ? 'rtl' : 'ltr'" class="text-left text-[13px] text-gray-500" v-if="nextMessage?.user?.username != message.user.username">
          {{ formatTime(message.date) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User, Message } from "~/types";
defineProps<{
  message: Message;
  user: User;
  lastMessage: Message;
  nextMessage: Message;
}>();

function formatTime(_date: string) {
  const date = new Date(_date);

  return new Intl.DateTimeFormat("ar-AR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    numberingSystem: "latn",
  }).format(date);
}
</script>
