<template>
  <div
    class="fixed z-50 bottom-4 flex flex-col space-y-3 ltr:right-4 rtl:left-4 xs:bottom-6 ltr:xs:right-6 rtl:xs:left-6 lg:bottom-8 ltr:lg:right-8 rtl:lg:left-8">
    <button class="rounded-full bg-gray-900 px-4 py-4 text-white hover:bg-gray-800 focus:outline-none" type="button"
      @click="showCreateNewOne = true" aria-label="إضافة">
      <!-- Heroicon name: outline/plus -->
      <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
        stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
      </svg>
    </button>
  </div>

  <template v-if="loading">
    <SkeletonsOrdersTable class="mt-6"/>
  </template>
  <div v-else class="is-scroll w-full overflow-x-auto pt-6">
    <p v-if="!offers.length" class="py-3 text-center">لايوجد لديك اي خصومات حاليا</p>

    <table v-else class="w-full text-sm ltr:text-left rtl:text-right">
      <thead class="border-b border-t">
        <tr>
          <OrdersTableHeaderCol content="نوع الخصم" />
          <OrdersTableHeaderCol content="تاريخ البدء" />
          <OrdersTableHeaderCol content="تاريخ الانتهاء" />
          <OrdersTableHeaderCol content="خصم النصية" />
          <OrdersTableHeaderCol content="خصم الصوتية" />
          <OrdersTableHeaderCol />
        </tr>
      </thead>
      <tbody class="divide-y text-center">
        <tr v-for="offer of offers">
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium text-right">
            {{ offer.type == 'percentage' ? 'نسبة المئوية' : 'مبلغ ثابت' }}
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium text-right">
            {{ useFormattedDate(offer.start_date) }}
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium text-right">
            {{ useFormattedDate(offer.end_date) }}
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium text-right">
            {{ offer.text_amount }}
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium text-right">
            {{ offer.video_amount }}
          </td>
          <td class="flex justify-center items-center pb-4 pe-4 pt-5">
            <button type="button" @click="deleteDiscount(offer.id)" title="حذف">
              <!-- Heroicon name: outline/trash -->
              <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" height="20" width="20">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0">
                </path>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <ProfileServiceCreateNewDiscount :show="showCreateNewOne" @close="showCreateNewOne = false" @reload="loadOffers()" />
  
</template>

<script setup lang="ts">
import type {Offer} from '~/types';
import useFormattedDate from '~/composables/useFormattedDate';
import useNotification from '~/composables/useNotification';

const { data: user } = useAuth();
let offers = ref<Offer[]>([]);
let loading = ref(false);
let showCreateNewOne = ref(false);
onMounted(async () => {
  await loadOffers();
});

async function loadOffers(){
  loading.value = true;
  const data = await useProxy(`/services/services/${user.value.username}/offers/`);
  offers.value = data.results;
  loading.value = false; 
};

async function deleteDiscount(id: number){
  try{
    await useProxy(`/services/services/${user.value.username}/offers/${id}/`, {method: 'DELETE'});
    useNotification({type: 'success', content: 'لقد تم حذف الخصم.'});
    await loadOffers();
  } catch(e){
    useNotification({type: 'danger', content: 'عذرا هناك خطأ في الحذف'})
  }
}



</script>

<style scoped></style>