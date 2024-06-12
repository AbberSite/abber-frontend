<template>
   <article v-for="i in 3" class="animate-pulse flex flex-col gap-3 border-2 border-gray-100 p-2 py-3 rounded-xl">
            <div class="h-3 w-[25%] rounded-full bg-gray-200"></div>
            <div class="h-3 w-[35%] rounded-full bg-gray-200"></div>
            <div class="flex w-full flex-col space-y-4 ">
                <div class="w-full space-y-4 pt-6">
                    <div class="h-5 w-[35%] rounded-full bg-gray-200"></div>
                </div>
                <div class="flex items-center justify-between gap-3">
                    <div class="aspect-[3/2] w-full rounded-xl bg-gray-200"></div>
                    <div class="aspect-[3/2] w-full rounded-xl bg-gray-200"></div>
                </div>
                <div class="w-full pt-2">
                    <div class="h-7 w-full rounded-full bg-gray-200"></div>
                </div>
            </div>
        </article>
</template>