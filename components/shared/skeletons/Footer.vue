<template>
    <div class="animate-pulse grid grid-cols-2 gap-y-14 pb-14 sm:grid-cols-3 md:grid-cols-4 lg:pb-16 xl:gap-x-10">
            <div class="xl:ms-4">
                <div class="h-6 w-32 bg-gray-200 rounded mb-4"></div>
                <ul class="space-y-5 pt-5" role="list">
                    <li v-for="i in 3" :key="'about-skel-'+i">
                        <div class="h-4 w-24 bg-gray-200 rounded"></div>
                    </li>
                </ul>
            </div>
            <div>
                <div class="h-6 w-32 bg-gray-200 rounded mb-4"></div>
                <ul class="space-y-5 pt-5" role="list">
                    <li v-for="i in 3" :key="'contact-skel-'+i">
                        <div class="h-4 w-40 bg-gray-200 rounded"></div>
                    </li>
                </ul>
            </div>
            <div>
                <div class="h-6 w-32 bg-gray-200 rounded mb-4"></div>
                <ul class="space-y-5 pt-5" role="list">
                    <li v-for="i in 2" :key="'app-skel-'+i">
                        <div class="h-10 w-32 bg-gray-200 rounded"></div>
                    </li>
                </ul>
            </div>
        </div>
</template>