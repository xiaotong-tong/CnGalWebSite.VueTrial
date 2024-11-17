<template>
	<div class="overflow-hidden" ref="container">
		<div>
			<Panel><span v-color>随机推荐</span></Panel>
		</div>
		<div
			class="h-300px flex"
			ref="scrollContent"
			:style="{
				columnGap: gapX + 'px'
			}"
		>
			<FieldsetCard
				class="item box-border h-full flex-none"
				v-for="item in list"
				:key="item.url"
				:style="{
					width: itemWidth + 'px'
				}"
			>
				<div>
					<img :src="item.image" :alt="item.name" class="w-full" />
				</div>
				<div>{{ item.name }}</div>
				<div class="line-clamp-3">
					{{ item.briefIntroduction }}
				</div>
			</FieldsetCard>
			<!-- 复制内容块以实现首尾相连 -->
			<FieldsetCard
				class="item box-border h-full flex-none"
				v-for="item in list"
				:key="'copy' + item.url"
				:style="{
					width: itemWidth + 'px'
				}"
			>
				<div>
					<img :src="item.image" :alt="item.name" class="w-full" />
				</div>
				<div>{{ item.name }}</div>
				<div class="line-clamp-3">
					{{ item.briefIntroduction }}
				</div>
			</FieldsetCard>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import { Panel, FieldsetCard } from "@p/index";
import { useList } from "./hook";
import { gsap } from "gsap";
import { useElementSize } from "@vueuse/core";

interface Props {
	animetDelay?: number;
	animeDuration?: number;
	gapX?: number;
}

const { animetDelay = 3, animeDuration = 1, gapX = 8 } = defineProps<Props>();

const { list, finished } = useList();

const container = ref();
const scrollContent = ref();

const { width } = useElementSize(container);

const itemWidth = computed(() => (width.value - gapX * 3) / 4);

watch(finished, (value) => {
	if (value) {
		nextTick(() => {
			// 需要 list 渲染完成后才能获取到正确的 scrollContent 的宽度
			const contentWidth = scrollContent.value.scrollWidth / 2 + gapX / 2; // 修改为一半的宽度加上间隙的一半

			function scrollAnime(index: number) {
				gsap.to(scrollContent.value, {
					x: -(itemWidth.value + gapX) * index,
					duration: animeDuration,
					yoyo: true,
					ease: "power1.inOut",
					modifiers: {
						x: gsap.utils.unitize((x) => parseFloat(x) % contentWidth)
					},
					onComplete() {
						setTimeout(() => {
							if (index === list.value.length) {
								scrollAnime(1);
								return;
							}
							scrollAnime(index + 1);
						}, animetDelay * 1000);
					}
				});
			}

			setTimeout(() => {
				scrollAnime(0);
			}, animetDelay * 1000);
		});
	}
});
</script>

<style scoped></style>
