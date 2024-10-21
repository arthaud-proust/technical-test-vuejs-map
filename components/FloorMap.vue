<template>
    <div ref="mapContainer"></div>
</template>
<script setup lang="ts">
import type {Marker} from "~/utils/types/marker";
import L from 'leaflet';
import 'leaflet.smoothwheelzoom';
import 'leaflet/dist/leaflet.css'
import {createVNode, render} from "vue";

const props = defineProps<{
    floorPlanUrl: string,
    markers: Array<Marker>
}>();

const slots = defineSlots<{
    marker(props: { label: string, imageUrl?: string }): any;
}>()

const map = ref();
const mapContainer = ref<HTMLDivElement>();

const zoomOnMarker = (marker: Marker) => {
    if (!marker) return

    map.value.setView([marker.y, marker.x], 1)
}

defineExpose({
    zoomOnMarker,
})

const floorPlanImage = await getImageSizes(props.floorPlanUrl)
const floorPlanImageBounds = [
    [0, 0],
    [floorPlanImage.height, floorPlanImage.width]
] as L.LatLngBoundsExpression

const leafletMarkers = new Map<number, L.Marker>();
const deleteMarker = (markerId: number) => {
    leafletMarkers.get(markerId)?.remove()
    leafletMarkers.delete(markerId)
}
const updateMarker = (marker: Marker) => {
    const existingMarker = leafletMarkers.get(marker.id)
    if (existingMarker) {
        deleteMarker(marker.id)
    }

    const html = document.createElement('div')

    render(
        createVNode(slots.marker, {
            label: marker.label,
            imageUrl: marker.imageUrl
        }),
        html
    )

    const customIcon = L.divIcon({html})

    const leafletMarker = L.marker([marker.y, marker.x], {icon: customIcon})

    leafletMarker.addTo(map.value)

    leafletMarkers.set(marker.id, leafletMarker)
}
const updateMarkers = (markers: Array<Marker>) => {
    const markerIds = markers.map(marker => marker.id);

    for (const [markerId] of leafletMarkers) {
        const markedRemoved = !markerIds.includes(markerId)

        if (markedRemoved) {
            deleteMarker(markerId)
        }
    }

    markers.forEach(updateMarker)
}
watch(() => props.markers, (markers) => {
    updateMarkers(markers)
})

onMounted(() => {
    map.value = L
        .map(mapContainer.value!, {
            crs: L.CRS.Simple,
            minZoom: -3,
            maxZoom: 2,
            zoomControl: false,
            scrollWheelZoom: false, // disable original zoom function
            // @ts-expect-error
            smoothWheelZoom: true,  // enable smooth zoom
            smoothSensitivity: 1.5,   // zoom speed. default is 1
            attributionControl: false,
        })
        .fitBounds(floorPlanImageBounds)
        .setView([floorPlanImage.height / 2, floorPlanImage.width / 2], -1)

    L.imageOverlay(props.floorPlanUrl, floorPlanImageBounds).addTo(map.value)

    updateMarkers(props.markers)
})
</script>