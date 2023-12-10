<template>
    <!-- <Header /> -->

    <main class="min-h-screen outline-none">
        <!-- Hero section -->
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
        <!-- Blog section -->
        <section
            class="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-4 pb-36 pt-20 xs:px-6 lg:px-8 xl:pb-44"
            aria-labelledby="blog-heading">
            <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
                <!-- Heroicon name: outline/rss -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" height="24" width="24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z">
                    </path>
                </svg>
            </div>
            <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl">المدونة</h1>
            <h2 class="pt-4 text-sm text-gray-800 xs:text-base">اخر المقالات المقدمة إسبوعيا</h2>
            <div class="grid gap-x-8 pt-16 lg:grid-cols-3 xl:gap-12">
                <div class="grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:col-span-2">
                    <BlogCard type="تفسير الأحلام" title="تفسير حلم العنكبوت تبعاً للحالة الاجتماعية للرائي"
                        duration="5 دقائق قراءة"
                        resume="تعرف على تفسير حلم العنكبوت: 1- امرأة ناشز تهجر فراش زوجها، 2- الحسد رمز العنكبوت الأصفر، 3- بشارة خير دلالة العنكبوت الأبيض، 4- السحر والكراهية رمز للعنكبوت الأسود في المنام."
                        image="/images/articles/1.webp" />
                    <BlogCard type="تفسير الأحلام" title="تعرف على تفسير حلم الساعة وأبرز دلالاته" duration="5 دقائق قراءة"
                        resume="تعرف على أبرز ما جاء في تفسير حلم الساعة: 1- إنذار بالإسراع في تأدية الأعمال. 2- الزواج مرة أخرى للمطلقة. 3- التزامات جديدة في حياة العزباء. 4- النية الحسنة، وصلاح أعمال المتزوجة. 5- سلامة مولود الحامل، وعافيته من أي مكروه."
                        image="/images/articles/2.webp" />
                    <BlogCard type="تفسير الأحلام" title="تفسير حلم الذئب | أبرز 6 دلالات لكبار المفسرين" duration="5 دقائق قراءة"
                        resume="تعرف على أهم دلالات تفسير حلم الذئب؟
                        يرمز الذئب إلى عدو ماكر، أو شخص كاذب ،أو كثرة الحساد في حياة الرائي، وإذا رأى الحالم أنه هرب
                        من الذئب في المنام فإنه ينتصر على أعدائه ويفوز على منافسيه."
                        image="/images/articles/3.webp" />

                </div>
                <div class="hidden lg:block">
                    <h3 class="text-lg font-semibold">التصنيفات</h3>
                    <ul class="space-y-4 pt-6">
                        <li class="flex items-center justify-between">
                            <a class="flex items-center space-x-2 text-gray-800 hover:text-gray-900 rtl:space-x-reverse"
                                href="#">
                                <!-- Heroicon name: outline/chevron-double-left -->
                                <svg class="ltr:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="14" width="14">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"></path>
                                </svg>
                                <span class="mt-1">معلومات عن النوم والأحلام</span>
                            </a>
                            <a class="hidden rounded-full bg-gray-50 px-3 pb-1.5 pt-2 text-xs font-semibold text-gray-800 hover:bg-gray-100 xl:flex"
                                href="#" title="عدد المقالات">9</a>
                        </li>
                        <li class="flex items-center justify-between">
                            <a class="flex items-center space-x-2 text-gray-800 hover:text-gray-900 rtl:space-x-reverse"
                                href="#">
                                <!-- Heroicon name: outline/chevron-double-left -->
                                <svg class="ltr:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="14" width="14">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"></path>
                                </svg>
                                <span class="mt-1">تفسير الأحلام</span>
                            </a>
                            <a class="hidden rounded-full bg-gray-50 px-3 pb-1.5 pt-2 text-xs font-semibold text-gray-800 hover:bg-gray-100 xl:flex"
                                href="#" title="عدد المقالات">28</a>
                        </li>
                        <li class="flex items-center justify-between">
                            <a class="flex items-center space-x-2 text-gray-800 hover:text-gray-900 rtl:space-x-reverse"
                                href="#">
                                <!-- Heroicon name: outline/chevron-double-left -->
                                <svg class="ltr:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="14" width="14">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"></path>
                                </svg>
                                <span class="mt-1">عبادات</span>
                            </a>
                            <a class="hidden rounded-full bg-gray-50 px-3 pb-1.5 pt-2 text-xs font-semibold text-gray-800 hover:bg-gray-100 xl:flex"
                                href="#" title="عدد المقالات">9</a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</main>

</template>

<script setup lang="ts">

</script>

<style scoped></style>