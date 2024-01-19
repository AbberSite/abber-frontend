<template>
    <Head>
        <title>عبر - طلب تعبير حلم - وسيلة الدفع</title>
    </Head>
    <div>
        <form method="POST">
            <fieldset class="space-y-7">
                <div class="w-full space-y-3">
                    <label class="block text-sm font-semibold xs:text-base" for="card">رقم البطاقة</label>
                    <div class="relative">
                        <input
                            class="form-control h-[50px] pl-12"
                            type="card"
                            name="card"
                            id="card"
                            placeholder="0000 0000 0000 0000"
                            required /><span
                            class="absolute h-[50px] items-center justify-center px-4 py-4 text-gray-600 hover:text-gray-900 ltr:right-0 rtl:left-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="20"
                                height="20"
                                viewBox="0 0 48 48">
                                <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                                <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                                <path
                                    fill="#ff3d00"
                                    d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path></svg
                        ></span>
                    </div>
                </div>
                <div class="flex items-center justify-between space-x-5 rtl:space-x-reverse">
                    <div class="w-full space-y-3">
                        <label class="block text-sm font-semibold xs:text-base" for="text">رمز التحقق (CVV)</label>
                        <input
                            class="form-control h-[50px] appearance-none"
                            type="text"
                            name="text"
                            id="text"
                            placeholder="000"
                            required />
                    </div>
                    <div class="w-full space-y-3">
                        <label class="block text-sm font-semibold xs:text-base" for="text">تأريخ الإنتهاء</label>
                        <input
                            class="form-control h-[50px] appearance-none"
                            type="text"
                            name="text"
                            id="text"
                            placeholder="MM/YY"
                            required />
                    </div>
                </div>
                <div>
                    <a
                        class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                        href="/order/complete">
                        <span class="mt-1.5">متابعة</span></a
                    >
                </div>
            </fieldset>
        </form>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
