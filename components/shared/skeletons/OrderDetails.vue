<template>
    <div class="hidden md:block animate-pulse my-2 mx-2 w-full h-full" >
        <div class="flex justify-between items-center">
            <div class="h-[18px] w-[100px] rounded-full bg-gray-300"></div>
            <div class="flex justify-end gap-2">
                <div class="h-[18px] w-[70px] bg-gray-300 rounded-md"/>
                <div class="h-[18px] w-[40px] bg-gray-300 rounded-md"/>
            </div>
        </div>
        <div class="flex justify-between mt-7 gap-4">
            <div class="h-[40vh] w-[40%] bg-gray-200 rounded-md"/>
            <div class="h-[70vh] w-[59%] bg-gray-200 rounded-md"/>
        </div>
    </div>
    <div class="md:hidden animate-pulse my-3 mx-2 w-full h-full" >
        <div class="w-full flex flex-col items-center h-full">
            <div class="w-[70px] h-[14px] rounded-full bg-gray-300" />
            <div class="w-full flex gap-2 justify-center my-4"><span class="w-[20px] h-[10px] bg-gray-300 rounded-full"/><span class="w-[20px] h-[10px] bg-gray-300 rounded-full"/><span  class="w-[20px] h-[10px] bg-gray-300 rounded-full"/></div>
            <div class="mt-[40px] flex gap-7 items-start w-full" >
                <div class="w-[60px] h-[12px] rounded-full bg-gray-300"/>
                <div class="w-[70px] h-[12px] rounded-full bg-gray-300"/>
            </div>
        </div>
        <div class="mt-5 w-full h-[40vh] rounded-md bg-gray-300"/>
    </div>
</template>