<template>
    <div ref="mapContainer"></div>
</template>
<script setup lang="ts">
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const mapContainer = ref<HTMLDivElement>();
const map = ref();

onMounted(() => {
    map.value = L
        .map(mapContainer.value!, {
            crs: L.CRS.Simple
        })
        .setView([0, 0], 0);
})

defineExpose({
    map
})
</script>