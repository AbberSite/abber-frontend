<template>
    <div class="w-full animate-pulse  sm:items-start">
        <div class="flex items-center justify-center sm:justify-between my-2">
            <div class="h-24 w-24 bg-gray-200 rounded-full"></div>
            <div class="hidden sm:block items-center space-x-3 bg-gray-200 rounded-md w-[25%] h-[40px]"></div>
        </div>
        <div class="w-full flex flex-col items-center sm:items-start pt-4">
            <div class="h-6 w-[150px] bg-gray-200 rounded-md"></div>
            <div class="h-6 w-[130px] bg-gray-200 rounded-md my-4"></div>
            <div class="h-3 w-[60%] bg-gray-200 rounded-md my-2" v-for="line in 4" ></div>
        </div>
    </div>

</template>