<template>
    <Head>
        <title>عبر - تسجيل الدخول</title>
    </Head>
    <main class="min-h-screen outline-none">
        <section class="relative isolate px-4 pt-14 xs:px-6 lg:px-8">
            <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true">
                <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
                </div>
            </div>
            <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true">
                <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
                </div>
            </div>
        </section>
        <section class="relative flex min-h-screen w-full flex-col items-center justify-center px-4 pb-14 xs:px-6"
            aria-labelledby="forget-password-heading">
            <h1 class="sr-only" id="forget-password-heading">تسجيل الدخول</h1>
            <div class="rounded-md border border-gray-300 px-2 py-2 shadow-sm">
                <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32"
                    viewBox="0 0 48 48">
                    <path fill="#40c351"
                        d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z">
                    </path>
                    <path fill="#fff" fill-rule="evenodd"
                        d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                        clip-rule="evenodd"></path>
                </svg>
            </div>
            <div class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl">تسجيل الدخول</div>
            <div class="pt-4 text-sm text-gray-800 xs:text-base">سنرسل لك رمز التحقق الى حسابك في الواتساب</div>
            <div class="mx-auto w-full max-w-sm pt-10">
                <form method="POST" @submit.prevent="send">
                    <fieldset class="space-y-7">
                        <div class="w-full space-y-3">
                            <!-- <label class="text-sm font-semibold xs:text-base" for="tel">رقم الواتساب</label>
                            <input class="form-control h-[50px] appearance-none" type="tel" name="phone" id="tel"
                                placeholder="7835196169" autocomplete="tel" required /> -->

                            <PhoneInput v-model="phone" />
                            <div class="text-red-500 text-sm ">
                                {{ errors.phone }}
                            </div>
                        </div>
                        <div>
                            <!-- <button
                                class="flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                                href="/accounts/whatsapp/opt"> <span class="mt-1.5">
                                    <Loading  v-if="loading"/>
                                    <span v-else>متابعة</span>
                                 </span></button>
 -->

                            <PrimaryButton class="w-full" :loading="loading">
                                متابعة
                            </PrimaryButton>

                        </div>
                    </fieldset>
                </form>
                <div class="pt-8 text-center text-sm xs:text-base"><a class="font-medium text-blue-600"
                        href="/accounts/login">العودة للصفحة السابقة ←</a></div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: false
})
const router = useRouter()


const phone = ref("")
const loading = ref(false)

const errors = ref<{
    phone?: string
}>({})

async function send() {

    // Login logic goes here


    try {
        loading.value = true
        const { data } = await useFetch("/api/auth/whatsapp/send", {
            method: 'POST',

            body: {

                phone: "+" + phone.value

            }

        }) as {
            data: Ref<{
                phone?: string,
                registered?: boolean,
                message?: string,
                status?: string

            }>
        }

        console.log(data)

        if (!data.value.registered) {

            errors.value.phone = 'هذا الرقم غير مسجل '
            loading.value = false


            return
        }

        const { currentPhone } = storeToRefs(useAuthStore())

        currentPhone.value = "+" + phone.value

        router.push({ name: "accounts-whatsapp-otp" })

    } catch (error: any) {

        alert("error")

        console.log(error.response)

    }

    loading.value = false

}

</script>

<style scoped></style>