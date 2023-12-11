<template>
    <section class="mx-auto max-w-7xl px-4 pb-36 xs:px-6 lg:px-8 xl:pb-44" aria-labelledby="articles-heading">
        <div class="flex items-end justify-between">
            <div>
                <h2 class="inline-flex rounded-full bg-gray-900 px-4 pb-1.5 pt-2 text-xs font-semibold text-white"
                    id="articles-heading">المدونة</h2>
                <div class="pt-6 text-lg font-semibold leading-[1.75] xs:text-xl 2xl:text-2xl">اخر المقالات المقدمة إسبوعيا
                </div>
            </div>
            <a class="hidden font-semibold text-gray-700 hover:text-gray-900 sm:flex" href="#">عرض جميع المقالات ←</a>
        </div>
        <div class="grid gap-x-8 gap-y-20 pt-16 sm:grid-cols-2 lg:grid-cols-3">
            <article>
                <a href="#">
                    
                    <!-- <img class="lazyload aspect-[3/2] w-full rounded-xl bg-gray-50"
                        src="../../assets/images/articles/1.webp" alt="صورة المقالة" /> -->

                        <NuxtImg fit="outside" class="w-full rounded-xl bg-gray-50"  src="/images/articles/1.webp" width="384" height="256"  />
                </a>
                <div class="flex w-full flex-col space-y-4 pt-8 text-right">
                    <div class="flex items-center justify-between text-gray-700">
                        <a class="rounded-full bg-gray-50 px-4 pb-1.5 pt-2 text-[13px] font-semibold hover:bg-gray-100 hover:text-gray-900"
                            href="#">تفسير الأحلام</a>
                        <span class="text-[13px]">5 دقائق قراءة</span>
                    </div>
                    <h3 class="pt-2 font-semibold leading-[1.75] xs:text-lg xs:leading-[1.75]">
                        <a href="#">تفسير حلم العنكبوت تبعاً للحالة الاجتماعية للرائي</a>
                    </h3>
                    <p class="text-justify text-sm text-gray-800 xs:text-base">تعرف على تفسير حلم العنكبوت: 1- امرأة ناشز
                        تهجر فراش زوجها، 2- الحسد رمز العنكبوت الأصفر، 3- بشارة خير دلالة العنكبوت الأبيض، 4- السحر
                        والكراهية رمز للعنكبوت الأسود في المنام.</p>
                    <div class="text-sm font-semibold xs:text-base">
                        <a href="#">إقرأ المزيد ←</a>
                    </div>
                </div>
            </article>
            <article>
                <a href="#">
                    <img class="lazyload aspect-[3/2] w-full rounded-xl bg-gray-50"
                        src="../../assets/images/articles/2.webp" alt="صورة المقالة" />
                </a>
                <div class="flex w-full flex-col space-y-4 pt-8 text-right">
                    <div class="flex items-center justify-between text-gray-700">
                        <a class="rounded-full bg-gray-50 px-4 pb-1.5 pt-2 text-[13px] font-semibold hover:bg-gray-100 hover:text-gray-900"
                            href="#">تفسير الأحلام</a>
                        <span class="text-[13px]">5 دقائق قراءة</span>
                    </div>
                    <h3 class="pt-2 font-semibold leading-[1.75] xs:text-lg xs:leading-[1.75]">
                        <a href="#">تعرف على تفسير حلم الساعة وأبرز دلالاته</a>
                    </h3>
                    <p class="text-justify text-sm text-gray-800 xs:text-base">تعرف على أبرز ما جاء في تفسير حلم الساعة: 1-
                        إنذار بالإسراع في تأدية الأعمال. 2- الزواج مرة أخرى للمطلقة. 3- التزامات جديدة في حياة العزباء. 4-
                        النية الحسنة، وصلاح أعمال المتزوجة. 5- سلامة مولود الحامل، وعافيته من أي مكروه.</p>
                    <div class="text-sm font-semibold xs:text-base">
                        <a href="#">إقرأ المزيد ←</a>
                    </div>
                </div>
            </article>
            <article>
                <a href="#">
                    <img class="lazyload aspect-[3/2] w-full rounded-xl bg-gray-50"
                        src="../../assets/images/articles/3.webp" alt="صورة المقالة" />
                </a>
                <div class="flex w-full flex-col space-y-4 pt-8 text-right">
                    <div class="flex items-center justify-between text-gray-700">
                        <a class="rounded-full bg-gray-50 px-4 pb-1.5 pt-2 text-[13px] font-semibold hover:bg-gray-100 hover:text-gray-900"
                            href="#">تفسير الأحلام</a>
                        <span class="text-[13px]">5 دقائق قراءة</span>
                    </div>
                    <h3 class="pt-2 font-semibold leading-[1.75] xs:text-lg xs:leading-[1.75]">
                        <a href="#">تفسير حلم الذئب | أبرز 6 دلالات لكبار المفسرين</a>
                    </h3>
                    <p class="text-justify text-sm text-gray-800 xs:text-base">تعرف على أهم دلالات تفسير حلم الذئب؟ يرمز
                        الذئب إلى عدو ماكر، أو شخص كاذب ،أو كثرة الحساد في حياة الرائي، وإذا رأى الحالم أنه هرب من الذئب في
                        المنام فإنه ينتصر على أعدائه ويفوز على منافسيه.</p>
                    <div class="text-sm font-semibold xs:text-base">
                    <a href="#">إقرأ المزيد ←</a>
                </div>
            </div>
        </article>
        <a class="block text-center font-semibold xs:text-lg sm:hidden" href="#">عرض جميع المقالات ←</a>
    </div>
</section></template>

<script setup lang="ts"></script>
<style scoped></style>