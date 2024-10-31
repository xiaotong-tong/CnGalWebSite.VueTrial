<template>
	<MyHeader></MyHeader>
	<RouterView />
</template>

<script setup>
import { ref, onMounted } from "vue";
import MyHeader from "./homeComponents/header.vue";
</script>

<style scoped></style>
