<template>

  <div ref="contextMenu"
    class="absolute bg-white dark:border dark:border-light duration-300 group-hover:opacity-100 group-hover:visible left-0  rounded-lg shadow text-gray-500 top-[calc(100%+20px)] transition-all w-32 z-10">
    <ul class="py-2 divide-light divide-y">
      <li @click="copyMessage()">
        <button type="button" class="flex hover:bg-gray-800 hover:text-gray-100 items-center px-5 py-3 w-full"
          title="نسخ الرسالة">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="20" width="20" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
          </svg>
          <span class="pr-3">نسخ</span>
        </button>
      </li>
      <li v-if="message?.user.username == user?.username" @click="deleteMessage()">
        <button type="button" class="flex hover:bg-gray-800 hover:text-gray-100 items-center px-5 py-3 w-full"
          title="حذف الرسالة">
          <svg xmlns="http://www.w3.org/2000/svg" class="flex-shrink-0" height="20" width="20" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          <span class="pr-3">حذف</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { User, Message } from '~/types';

const props = defineProps<{
  message: Message;
  user: User;
  isDashSupport?: boolean, dataChat?: Object

}>();
const emit = defineEmits(['update:change']);

let send; 
if(props.isDashSupport)
    send = useChat('support', props.dataChat.isDashSupport, props.dataChat.roomName).send;
else 
    send = useChat().send;

const contextMenu = ref<HTMLElement | null>(null)



defineExpose({
  contextMenu
})



async function copyMessage() {
  try {
    // Use navigator.clipboard.writeText to copy message to clipboard
    await navigator.clipboard.writeText(props.message.message);
    // Optionally, provide some feedback to the user
    // alert('Message copied to clipboard!');

  } catch (error) {
    // Handle any errors
    console.error('Failed to copy message to clipboard:', error);
    // Optionally, provide error feedback to the user
    alert('Failed to copy message to clipboard. Please try again or use a different method.');
  }
  emit('update:change', true);

}

async function deleteMessage() {
  send(
    JSON.stringify({
      type: 'delete_message',
      message: props.message.id,
    }),
  );
  emit('update:change', true);
}
</script>

<style></style>