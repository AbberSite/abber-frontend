<template>
    <div class="relative w-full border-t border-gray-100 bg-white py-2 my-2">
        <textarea @keyup.enter="sendMessage()" class="form-control block py-4"
            :class="{ 'h-[200px]': files.length, 'h-[120px]': !files.length }" v-model="message" rows="2"
            placeholder="إبدأ الكتابة هنا..." required></textarea>
        <!-- Toolbar -->
        <div class="rounded-b-md bg-white px-1 mb-2 my-[10px]">
            <div class="flex items-center " :class="!isSupport ? 'justify-end' : 'justify-between'">
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
                <ChatMultipleFilesInput v-model="files" :class="{ 'hidden': !isSupport }" />
                <!-- Button Group -->
                <div class="flex items-center space-x-3 rtl:space-x-reverse">
                    <!-- Mic Button -->
                    <ClientOnly>
                        <ChatAudioInput v-model:recording="recorderStatus" :isDashSupport="isDashSupport"
                            :dataChat="{ ...props.dataChat }" />
                    </ClientOnly>
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
const props = defineProps<{ isSupport?: boolean, isDashSupport?: boolean, dataChat?: Object }>()
const files = ref<File[]>([])
const emit = defineEmits(['sendMessage']);
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
const { data } = useAuth();
let send, status;

const recorderStatus = ref("intialized");

const message = ref<string>('');
async function sendMessage() {
    console.log(status?.value);
    if (files.value.length) {
        files.value.forEach(async (file, index) => {
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
                }));
                message.value = '';
            });
        });
        files.value = [];
        return;
    };
    send(
        JSON.stringify({
            message: message.value
        })
    );

    message.value = '';
    setTimeout(() => {
        emit('sendMessage');
    }, 1000);
};


function getRandomFileName() {
    var timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    var random = ('' + Math.random()).substring(2, 8);
    var random_number = timestamp + random;
    return random_number;
};
watch(status, (value) => console.log(`websocket status changed to ${value}`));
onMounted(async () => {
    if (props.isDashSupport) {
        send = useChat('support', props.dataChat.isDashSupport, props.dataChat.roomName).send;
        status = useChat('support', props.dataChat.isDashSupport, props.dataChat.roomName).status;
    } else {
        send = useChat().send;
    };
})
</script>

<style scoped></style>
