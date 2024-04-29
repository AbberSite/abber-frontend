<template>
    <div>{{ treeComputed }}</div>
</template>

<script setup lang="ts" >
const props = defineProps<{url: string;}>();
const words: {[key: string]: string} = {orders: 'الطلبات', home: 'الرئيسية'};
const treeComputed = computed(()=> {
    const url = props.url.split('/');
    for(const proper in url){
        console.log(words.hasOwnProperty(proper))
    } 
    return 'هذه الشجرة';
});
</script>