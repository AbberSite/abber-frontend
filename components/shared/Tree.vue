<template>
    <div class="flex justify-between gap-1 text-slate-800 pt-4 ">
        <NuxtLink  v-for="(item, index) of treeComputed" :key="index" class="flex justify-center items-center gap-2 hover:text-blue-500" :to="item.path"  >
            <span class="text-xs font-semibold" >{{ item.title  }}</span>
            <svg v-if="index != treeComputed.length - 1" height="10px" width="9px" viewBox="0 0 15 26" xmlns="http://www.w3.org/2000/svg">
                <polygon fill="#231F20"
                    points="12.885,0.58 14.969,2.664 4.133,13.5 14.969,24.336 12.885,26.42 2.049,15.584 -0.035,13.5" />
            </svg>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const words: { [key: string]: string } = { orders: 'الطلبات', home: 'الرئيسية', support: 'الدعم' };
const treeComputed = computed(() => {
    const url = route.fullPath.split('/');
    var my_tree = [];
    const skipWrods = ['video'];
    for (let i = 0; i < url.length; i++) {
        if(skipWrods.includes(url[i])) continue;
        else if (i == 0 && url[i] == '') {
            my_tree.push({title: words['home'], path: '/'});
        } else if (i == (url.length - 1) && url[i] == '') {
            break;
        }
        else {
            if (words.hasOwnProperty(url[i])) {
                my_tree.push({title: words[url[i]], path: makeURL(url[i])})
            } else {
                my_tree.push({title: `#${url[i]}`, path: makeURL(url[i])});
            }
        }

    };
    return my_tree;
});

function makeURL(nextURL: string){
    const orginalURL = route.fullPath as string;
    let rightURL = orginalURL.substring(0, (orginalURL.indexOf(nextURL) + nextURL.length ));
    return rightURL;
}
</script>