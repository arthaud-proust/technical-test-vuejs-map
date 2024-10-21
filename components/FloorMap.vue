<template>
    <div ref="mapContainer"></div>
</template>
<script setup lang="ts">
import type {Marker} from "~/utils/types/marker";
import L from 'leaflet';
import 'leaflet.smoothwheelzoom';
import 'leaflet/dist/leaflet.css'

const props = defineProps<{
    floorPlanUrl: string,
    markers: Array<Marker>
}>();

const map = ref();
const mapContainer = ref<HTMLDivElement>();

const zoomOnMarker = (marker: Marker) => {
    if (!marker) return

    map.value.setView([marker.x, marker.y], 1)
}

defineExpose({
    zoomOnMarker,
})

const floorPlanImage = await getImageSizes(props.floorPlanUrl)
const floorPlanImageBounds = [
    [0, 0],
    [floorPlanImage.height, floorPlanImage.width]
] as L.LatLngBoundsExpression

const leafletMarkers = ref<Record<number, L.Marker>>({})
const updateMarkers = (markers: Array<Marker>) => {
    const markerIds = markers.map(marker => marker.id)

    Object.keys(leafletMarkers.value).map(Number).forEach(markerId => {
        const markedRemoved = !markerIds.includes(markerId)

        if (markedRemoved) {
            leafletMarkers.value[markerId].remove()
            delete leafletMarkers.value[markerId]
        }
    })

    markers.forEach(marker => {
        const existingMarker = leafletMarkers.value[marker.id]

        if (existingMarker) {
            leafletMarkers.value[marker.id].setLatLng([marker.x, marker.y])
        } else {
            leafletMarkers.value[marker.id] = L.marker([marker.x, marker.y]).addTo(map.value)
        }
    })
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