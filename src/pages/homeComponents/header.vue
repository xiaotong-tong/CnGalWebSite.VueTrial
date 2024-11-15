<template>
	<header class="sticky top-0 h-52px bg-#ffffffaa px-4 z-9">
		<h1 class="h-full m-0">
			<Link to="/" class="h-full flex items-center gap-x-2">
				<img class="h-8 w-8 rounded-lg" src="/logo.png" alt="CnGal资料站 logo" />
				<span class="text-22px" v-color>CnGal资料站</span>
			</Link>
		</h1>
		<roughLine class="absolute bottom-0 left-0 right-0" />
	</header>
</template>

<script setup>
import { Link, roughLine } from "@p/index";
</script>

<style scoped>
header {
	box-shadow: 0 3px 6px rgba(from var(--d-color) r g b / 0.15);
	backdrop-filter: blur(5px);
}
</style>
