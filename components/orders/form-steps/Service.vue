<template>
  <Head>
    <title>عبر - طلب تعبير حلم - إختيار المعبر</title>
  </Head>

  <div>
    <div>
      <fieldset class="space-y-5">
        <div class="is-scroll max-h-[400px] space-y-5 overflow-y-auto p-1" id="list-expressors">
          <template v-if="loading">
            <SkeletonsServiceRadioButton />
            <SkeletonsServiceRadioButton />
            <SkeletonsServiceRadioButton />
            <SkeletonsServiceRadioButton />
          </template>
          <template v-else>
            <template v-if="state.data?.type == 'text_communication'">
              <FormStepsServiceSelectUrgentOrderService @click.once="submit(0)" v-model="selectedService" />
              <FormStepsServiceSelectServiceRadioButton v-for="service in textCommunicationServices.filter((service) => service?.work_hour?.is_available_now)" v-model="selectedService" @click.once="submit(service.id, service.service_prices.text_price)" :service="service" :type="1" />
              <span class="text-center text-sm py-0.5 inline-block w-full" v-if="textCommunicationServices.filter((service) => !service?.work_hour?.is_available_now).length > 0"> قد يتأخر المعبر في الرد </span>
              <FormStepsServiceSelectServiceRadioButton v-for="service in textCommunicationServices.filter((service) => !service?.work_hour?.is_available_now)" v-model="selectedService" @click.once="submit(service.id, service.service_prices.text_price)" :service="service" :type="1" />
            </template>
            <template v-else>
              <FormStepsServiceSelectServiceRadioButton v-for="service in videoServices" v-model="selectedService" @click.once="submitVideo(service.id)" :service="service" :type="0" />
            </template>
          </template>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OrderForm } from "~/types";

const { state, next } = useFormWizard<OrderForm>("order");

const { status } = useAuth();
const emits = defineEmits(["next"]);

const loading = ref(false);

const selectedService = ref(0);

const { fetchAll } = useServicesStore();

const { services, textCommunicationServices, videoServices } = storeToRefs(useServicesStore());

onMounted(async () => {
  let listExpressorElement = document.getElementById("list-expressors") as Element;
  setTimeout(() => {
    listExpressorElement.scrollTo({ behavior: "smooth", top: listExpressorElement.scrollHeight / 2 });
  }, 800);
  setTimeout(() => {
    listExpressorElement.scrollTo({ behavior: "smooth", top: 0 });
  }, 2000);

  if (services.value.length != 0) return;

  loading.value = true;
  await fetchAll();
  loading.value = false;
});

function submit(service_id: number) {
  selectedService.value = service_id;

  if (status.value == "loading") return;
  if (!service_id) {
    if (status.value == "authenticated") {
      next({
        nextStepId: "payment",
        data: { service_id: 0, orders: [], selectedServices: [] },
      });
      return;
    } else {
      next({
        nextStepId: "authentication-method",
        data: { service_id: 0, orders: [], selectedServices: [] },
      });
    }
    return;
  }
  next({ nextStepId: "my-urgent-order-service", data: { service_id: selectedService.value } });
}

function submitVideo(service_id: number) {
  selectedService.value = service_id;

  if (status.value == "loading") return;
  if (status.value == "authenticated") next({ nextStepId: "payment", data: { service_id: selectedService.value } });
  else next({ nextStepId: "authentication-method", data: { service_id: selectedService.value } });
}
</script>

<style scoped></style>
