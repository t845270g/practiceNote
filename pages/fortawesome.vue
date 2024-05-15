<template>
 

    <font-awesome-icon icon="fa-solid fa-user" />
    <font-awesome-icon :icon="['fas', 'user']" />
    <font-awesome-icon icon="user" />

    <font-awesome-icon icon="fa-regular fa-user" />
    <font-awesome-icon :icon="['far', 'user']" />
</template>

<script setup>
import { useMainStore } from "@/store/currentStore";
const mainStore = useMainStore();
mainStore.routeName="fortawesome模組"
</script>

<style></style>
