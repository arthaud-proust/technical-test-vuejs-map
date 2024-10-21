<template>
    <div
        class="-translate-y-1/2 -translate-x-1/2 h-12 aspect-square rounded-full bg-white border-blue-500 border-2 overflow-hidden flex items-center justify-center">
        <img class="h-full aspect-square" v-if="imageUrl" :src="imageUrl" :alt="label">
        <span v-else class="text-sm">{{ label }}</span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    label: string,
    imageUrl?: string
}>();
</script>