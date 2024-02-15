<template>
    <div class="space-y-6 rounded-lg border border-gray-100 px-6 py-6 lg:col-span-2">
        <!-- Date -->
        <div class="relative w-full">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t"></div>
          </div>
          <div class="relative flex justify-center"><span class="bg-white px-4 pt-1 text-[13px]">
            {{ useArabicFormattedDate(order?.order_item_time_data.start_date as string) }}
          </span></div>
        </div>
        <!-- Your messages -->
        <div class="flex w-full" dir="rtl">
          <img class="lazyload h-11 w-11 rounded-full bg-gray-100" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=" data-src="/assets/images/avatar.webp" height="44" width="44" alt="" />
          <div class="ms-3 w-full space-y-3">
            <div class="w-fit min-w-[4rem] max-w-full space-y-2">
              <div class="rounded-lg rounded-tr-none bg-sky-100 px-4 py-4 text-right text-sm leading-loose">
                <div class="space-y-2">
                  <div class="space-x-2 rtl:space-x-reverse"><span class="font-semibold">العنوان:</span><span>تفسير رؤية العقرب</span></div>
                  <div class="space-x-2 rtl:space-x-reverse"><span class="font-semibold">الحلم:</span><span>هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص</span></div>
                  <div class="space-x-2 rtl:space-x-reverse"><span class="font-semibold">تأريخ الحلم:</span><span>11-02-2024</span></div>
                  <div class="space-x-2 rtl:space-x-reverse"><span class="font-semibold">العمر:</span><span>29</span></div>
                  <div class="space-x-2 rtl:space-x-reverse"><span class="font-semibold">الجنس:</span><span>ذكر</span></div>
                  <div class="space-x-2 rtl:space-x-reverse"><span class="font-semibold">الحالة الإجتماعية:</span><span>أعزب</span></div>
                  <div class="space-x-2 rtl:space-x-reverse"><span class="font-semibold">المهنة:</span><span>معلم</span></div>
                </div>
                <div class="flex justify-end">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="10" width="10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                  </svg>
                </div>
              </div>
              <p class="text-left text-[13px] text-gray-500">12:25 ص</p>
            </div>
          </div>
        </div>
        <!-- Date -->
        <div class="relative w-full">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t"></div>
          </div>
          <div class="relative flex justify-center"><span class="bg-white px-4 pt-1 text-[13px]">13 شباط 2024</span></div>
        </div>
        <!-- Expressor messages -->
        <div class="flex w-full" dir="ltr">
          <img class="lazyload h-11 w-11 rounded-full bg-gray-100" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=" data-src="/assets/images/avatar.webp" height="44" width="44" alt="" />
          <div class="ms-3 w-full space-y-3">
            <div class="w-fit min-w-[4rem] max-w-full space-y-2">
              <div class="rounded-lg rounded-tl-none bg-gray-50 px-4 py-4 text-right text-sm leading-loose">
                <div>تم قبول الطلب المستعجل من خلال التطبيق</div>
              </div>
              <div class="rounded-lg rounded-tl-none bg-gray-50 px-4 py-4 text-right text-sm leading-loose">
                <div>تم قبول الطلب المستعجل من خلال التطبيق</div>
              </div>
              <p class="text-right text-[13px] text-gray-500">11:00 ص</p>
            </div>
          </div>
        </div>
        <!-- Your messages -->
        <div class="flex w-full" dir="rtl">
          <img class="lazyload h-11 w-11 rounded-full bg-gray-100" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=" data-src="/assets/images/avatar.webp" height="44" width="44" alt="" />
          <div class="ms-3 w-full space-y-3">
            <div class="w-fit min-w-[4rem] max-w-full space-y-2">
              <div class="rounded-lg rounded-tr-none bg-sky-100 px-4 py-4 text-right text-sm leading-loose">
                <div>هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص</div>
                <div class="flex justify-end">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="10" width="10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                  </svg>
                </div>
              </div>
              <div class="rounded-lg rounded-tr-none bg-sky-100 px-4 py-4 text-right text-sm leading-loose">
                <div>هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص</div>
                <div class="flex justify-end">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="10" width="10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                  </svg>
                </div>
              </div>
              <p class="text-left text-[13px] text-gray-500">11:30 ص</p>
            </div>
          </div>
        </div>
        <div class="relative w-full">
          <textarea class="form-control block min-h-[200px] py-4" rows="5" placeholder="إدخل نص الرسالة هنا..." required></textarea>
          <!-- Toolbar -->
          <div class="absolute inset-x-px bottom-px rounded-b-md bg-white px-4 py-4">
            <div class="flex items-center justify-between">
              <!-- Attach Button -->
              <button class="text-gray-600 hover:text-gray-900" type="button">
                <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
              </button>
              <!-- Button Group -->
              <div class="flex items-center space-x-3 rtl:space-x-reverse">
                <!-- Mic Button -->
                <button class="flex-shrink-0 text-gray-600 hover:text-gray-900" type="button">
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                  </svg>
                </button>
                <!-- Send Button -->
                <button class="rounded-md bg-gray-900 p-2 text-white" type="button">
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">
const { order, messages } = storeToRefs(useOrdersStore());
const { fetchMessages } = useOrdersStore()



const id = useRoute().params.id
if(!process.client) {
  await fetchMessages(id)
}

onMounted(async () => {

  // if(messages.value.length != 0) return
  await fetchMessages(id)

})



</script>

<style scoped>

</style>