<script setup>
import { ref, defineEmits } from 'vue';

const text = ref('');
const emits = defineEmits(["onNewItem"]);

function handleSumbit(){
    if(text !== ""){
        emits ("onNewItem", text.value);
        text.value = "";
    }
}

</script>
<template>
<form action="" @submit.prevent="handleSumbit">
    <input type="text" v-model="text" />
</form>

</template>
<style scoped>
</style>