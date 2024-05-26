<template>
    <section class="relative flex min-h-screen w-full flex-col items-center justify-center px-4 pb-14 pt-28 md:pt-32 xs:px-6"
            aria-labelledby="forget-password-heading">
            <AuthenticationHeading whatsapp/>
            <div class="mx-auto w-full max-w-sm pt-10">
                <form method="POST" @submit.prevent="send">
                    <fieldset class="space-y-7">
                        <div class="w-full space-y-3">

                            <PhoneInput v-model="phone" v-model:valid="valid" />
                            <div class="text-red-500 text-sm ">
                                {{ errors.phone }}
                            </div>
                        </div>
                        <div>

                            <PrimaryButton class="w-full" :loading="loading">
                                متابعة
                            </PrimaryButton>

                        </div>
                    </fieldset>
                </form>
                <AuthenticationSocialLogin/>
                <!-- <div class="pt-8 text-center text-sm xs:text-base"><a class="font-medium text-blue-600"
                        href="/accounts/login">العودة للصفحة السابقة <span aria-hidden="true">←</span></a></div> -->
            </div>
        </section>
</template>

<script setup lang="ts">
const router = useRouter()


const phone = ref("")
const loading = ref(false)

const errors = ref<{
    phone?: string
}>({})
const valid = ref(false)

async function send() {

    if(!valid.value) return    

    try {
        loading.value = true
        const { data } = await useFetch("/api/auth/whatsapp/send?sender=whatsapp", {
            method: 'POST',

            body: {

                phone:  phone.value

            }

        }) as {
            data: Ref<{
                phone?: string,
                registered?: boolean,
                message?: string,
                status?: string

            }>
        }

        if (!data.value.registered) {
            errors.value.phone = 'هذا الرقم غير مسجل ';
            loading.value = false;
            return
        }

        const { currentPhone } = storeToRefs(useAuthStore())

        currentPhone.value = phone.value

        sessionStorage.setItem("abber:whatsapp-number", phone.value)

        router.push({ name: "accounts-whatsapp-otp", query: { sender : "whatsapp"} })

    } catch (error: any) {

        alert("error")

        console.log(error.response)

    }

    loading.value = false

}
</script>