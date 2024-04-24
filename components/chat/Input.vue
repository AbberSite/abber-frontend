<template>
    <div class="sticky bottom-0 z-20 w-full border-t border-gray-100 bg-white py-6">
        <textarea @keydown="handleMessageInput" class="form-control block min-h-[200px] py-4" :value="message" rows="5"
            placeholder="إبدأ الكتابة هنا..." required></textarea>
        <!-- Toolbar -->
        <div class="absolute inset-x-px bottom-px rounded-b-md bg-white px-4 py-4">
            <div class="flex items-center justify-between">
                <!-- Attach Button -->
                <!-- <button class="text-gray-600 hover:text-gray-900" type="button" @click="() => open()">
                    <svg
                        class="flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <path
                            d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                    </svg>
                </button> -->
                <ChatMultipleFilesInput v-model="files" />
                <!-- Button Group -->
                <div class="flex items-center space-x-3 rtl:space-x-reverse">
                    <!-- Mic Button -->
                    <ClientOnly>
                        <ChatAudioInput v-model:recording="recorderStatus" />
                    </ClientOnly>
                    <!-- <button class="flex-shrink-0 text-gray-600 hover:text-gray-900" type="button">
                        <svg
                            class="flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round">
                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                            <line x1="12" x2="12" y1="19" y2="22"></line>
                        </svg>
                    </button> -->
                    <!-- Send Button -->

                    <button v-if="recorderStatus != 'recording'" class="rounded-md bg-gray-900 p-2 text-white"
                        type="button" @click="sendMessage">
                        <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" viewBox="0 0 16 16">
                            <path
                                d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z">
                            </path>
                        </svg>
                    </button>

                    <!-- <img  v-for="preview in previews" :src="preview" alt="" srcset=""> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFileDialog } from '@vueuse/core';

const { open, reset, onChange } = useFileDialog({
    accept: 'image/png', // Set to accept only image files
});

const files = ref<File[]>([])

const previews = computed(() => {

    return files.value.map((file: File) => {
        return URL.createObjectURL(file);
    });

});

onChange((_files) => {
    files.value.push(_files?.item(0) as File);
});

const id = useRoute().params.id;
const { messages } = storeToRefs(useChatStore());
const { data } = useAuth()
const { send } = useChat();

const recorderStatus = ref("intialized");

const message = ref('');
async function sendMessage() {
    if (message.value.trim() === '') return;
    if (files.value.length) {
        files.value.forEach(async(file, index) => {
            const fileName = getRandomFileName() + '.png';
            messages.value.unshift({
                user: {
                    username: data.value.username,
                    image: data.value.image_url,
                    first_name: data.value.first_name,
                    last_name: data.value.last_name,
                    is_online: data.value.is_online
                },
                message: message.value,
                files: [
                    {
                        id: index,
                        file: file.preview,
                        name: fileName,
                        mimetype: file.type
                    }
                ],
                date: new Date().toISOString(),
                sent: true
            });
            const body = new FormData();
            body.append("file", file, fileName);
            await useApi("/api/audio", {
                method: 'post',
                body: body
            }).then(my_file => {
                send(JSON.stringify({
                    message: message.value,
                    files: [my_file.id]
                }))
            });
        });
        files.value = [];
        message.value = '';
        return;
    };
    send(
        JSON.stringify({
            message: message.value
        })
    );

    message.value = '';
}

function handleMessageInput(event: KeyboardEvent) {
    message.value = (event.target as HTMLTextAreaElement).value;

    const isShift = !!event.shiftKey;

    if (event.key === 'Enter' && !isShift) {
        sendMessage();
        message.value = '';

        event.preventDefault();
    }
}

function getRandomFileName() {
    var timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    var random = ('' + Math.random()).substring(2, 8);
    var random_number = timestamp + random;
    return random_number;
}
</script>

<style scoped></style>
