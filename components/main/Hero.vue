<template>
    <section class="relative isolate px-4 pt-14 xs:px-6 lg:px-8">
        <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
            </div>
        </div>
        <div class="mx-auto flex max-w-2xl flex-col items-center pb-20 pt-28 text-center sm:pb-28 sm:pt-32 2xl:py-36">
            <NuxtImg src="/images/logo.webp" class="mb-10 aspect-square" height="85" width="85" alt="شعار منصة عبر" />
            <h1 class="text-xl font-semibold lg:text-2xl 2xl:text-3xl">عبر - عالمك الخاص لتفسير الأحلام</h1>
            <p class="pt-4 text-justify text-sm text-gray-800 xs:text-base">في عبر، نساعدك على فهم أحلامك والرسائل الخفية
                التي تحملها لك. لدينا فريق من المعبرين الموثوقين والمتخصصين في علم تفسير الأحلام، سيقدمون لك تفسيراً دقيقًا
                ومنطقياً لأحلامك، بناءً على خبرتهم الواسعة ومعرفتهم بتعبير الأحلام.</p>
            <div class="w-full pt-8 sm:w-auto"
            v-if="status === 'unauthenticated' ||  data.user_type == 'عميل'"
            >
                <NuxtLink class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                    :to="{ name : 'orders-make'}"> <span class="mt-1.5">فسر حلمك الان</span></NuxtLink>
            </div>
        </div>
        <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true">
            <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
            </div>
        </div>
    </section>
    <!-- Features section -->
    <section
        class="mx-auto grid max-w-7xl gap-x-8 gap-y-14 px-4 pb-36 xs:px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-8 xl:pb-44"
        aria-labelledby="features-heading">
        <h2 class="sr-only" id="features-heading">مميزات عبر</h2>
        <div class="flex">
            <div class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-gray-900">
                
                <!-- Heroicon name: outline/arrow-left-on-rectangle -->
                <ArrowLeftEndOnRectangleIcon class="h-6 w-6 flex-shrink-0 text-white" />
     
            </div>
            <div class="ms-6">
                <h3 class="font-semibold xs:text-lg">سجل بالطريقة المناسبة لك</h3>
                <p class="pt-3 text-justify text-sm text-gray-800 xs:text-base">أختر وسيلة التسجيل الأكثر ملائمة لك وكن على
                    تواصل دائم</p>
            </div>
        </div>
        <div class="flex">
            <div class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-gray-900">

                <!-- Heroicon name: outline/user-group -->
                <UserGroupIcon class="h-6 w-6 flex-shrink-0 text-white" />
     
            </div>
            <div class="ms-6">
                <h3 class="font-semibold xs:text-lg">نخبة من المعبرين ينتظرونك</h3>
                <p class="pt-3 text-justify text-sm text-gray-800 xs:text-base">قائمة من المعبرين المتاحين لخدمتك ٢٤/٧</p>
            </div>
        </div>
        <div class="flex">
            <div class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-gray-900">

                <!-- Heroicon name: outline/credit-card -->
                <CreditCardIcon class="h-6 w-6 flex-shrink-0 text-white" />
                
            </div>
            <div class="ms-6">
                <h3 class="font-semibold xs:text-lg">وسائل دفع متعددة</h3>
                <p class="pt-3 text-justify text-sm text-gray-800 xs:text-base">يمكن الدفع باستخدام أبل باي و مدى و فيزا و
                    اس تي سي باي وغيرها</p>
            </div>
        </div>
        <div class="flex">
        <div class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-gray-900">

            <!-- Heroicon name: outline/chat-bubble-bottom-center-text -->
            <ChatBubbleBottomCenterTextIcon class="h-6 w-6 flex-shrink-0 text-white" />
 
        </div>
        <div class="ms-6">
            <h3 class="font-semibold xs:text-lg">تواصل مع المعبرين</h3>
            <p class="pt-3 text-justify text-sm text-gray-800 xs:text-base">أحصل على تعبير حلمك عن طريق المحادثة
                الكتابية او الصوتية مع معبرينا</p>
        </div>
    </div>
</section></template>

<script setup lang="ts">

import { ArrowLeftEndOnRectangleIcon, UserGroupIcon, CreditCardIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/outline';


const { data, status } = useAuth()

</script>

<style scoped></style>
