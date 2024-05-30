<template>

    <Head>
        <title>عبر - طلب تعبير حلم - إختيار المعبر</title>
    </Head>

    <div>
        <div>

            <fieldset class="space-y-7">
                <div class="is-scroll max-h-[400px] overflow-y-auto p-1" id="ServiceMulti">
                    <template v-if="loading">
                        <SkeletonsServiceRadioButton />
                        <SkeletonsServiceRadioButton />
                        <SkeletonsServiceRadioButton />
                        <SkeletonsServiceRadioButton />
                    </template>
                    <template v-else>
                        <div class="flex justify-center gap-3" v-show="!yes">
                            <button
                                class="relative flex items-center rounded-md border border-transparent bg-gray-900 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                                type="button" @click="sendResponse(true)"><span class="mt-1.5">نعم</span></button>
                            <button
                                class="relative ms-3 inline-flex items-center rounded-md border bg-white px-6 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50"
                                @click="sendResponse(false)"><span class="mt-1.5">لا</span></button>
                        </div>
                        <!-- first element of from FormStepsServiceSelectServiceCheckboxButton -->
                        <FormStepsServiceSelectServiceCheckboxButton v-show="yes"
                            v-for="service in textCommunicationServices" v-model="selectedsService" :service="service"
                            :selected-id="selected" class="mt-5" />
                    </template>

                </div>
            </fieldset>
            <div v-show="selectedsService.length != 0">
                <PrimaryButton @click="submit()" class="w-full">متابعة</PrimaryButton>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import type { OrderForm } from '~/types';
const { state, next } = useFormWizard<OrderForm>('order');
const { textCommunicationServices } = storeToRefs(useServicesStore());
const { status } = useAuth();
const loading = ref(false);
const selected: number = ref(state.value.data?.service_id);
const selectedsService = ref(state.value.data?.selectedServices ?? []);
let yes = ref(false);
function sendResponse(res: boolean) {
    if (res) {
        yes.value = true;
        // next({nextStepId: 'payment', data: { orders: undefined, selectedServices: undefined }});
        // next({ nextStepId: '', data: { selectedService: 0 } });
    } else {
        if (status.value == 'authenticated')
            next({ nextStepId: 'payment', data: { orders: undefined, selectedServices: undefined } });
        else {
            next({
                nextStepId: 'authentication-method',
                data: { orders: undefined, selectedServices: undefined }
            })
        }
        // submit();
    }
}

function submit() {
    if (status.value == 'authenticated') {
        next({
            nextStepId: 'payment',
            data: {
                selectedServices: selectedsService.value, selectedService: selected
            }
        });
        return;
    } else {
        next({
            nextStepId: 'authentication-method',
            data: { selectedServices: selectedsService.value, selectedService: selected }
        })
    }

};


</script>

<style scoped>
#ServiceMulti label:first-of-type {
    margin-top: 0px;
}
</style>