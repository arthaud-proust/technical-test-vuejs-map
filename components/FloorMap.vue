<template>
    <div ref="mapContainer"></div>
</template>
<script setup lang="ts">
import type {Marker} from "~/utils/types/marker";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'

const props = defineProps<{
    floorPlanUrl: string,
    markers: Array<Marker>
}>();

const floorPlanImage = await getImageSizes(props.floorPlanUrl)
const floorPlanImageBounds = [
    [0, 0],
    [floorPlanImage.height, floorPlanImage.width]
] as L.LatLngBoundsExpression

const mapContainer = ref<HTMLDivElement>();
const map = ref();

onMounted(() => {
    map.value = L
        .map(mapContainer.value!, {
            crs: L.CRS.Simple,
            minZoom: -3,
            maxZoom: 2,
        })
        .fitBounds(floorPlanImageBounds)
        .setView([floorPlanImage.height / 2, floorPlanImage.width / 2], -1)

    L.imageOverlay(props.floorPlanUrl, floorPlanImageBounds).addTo(map.value)
})
</script>