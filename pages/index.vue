<template>
    <div class="container mx-auto">
        <h1>Floor Map</h1>
        <ClientOnly>
            <FloorMap ref="floorMapRef" id="floor-map" :markers="markers" :floorPlanUrl="floorPlanUrl" />
        </ClientOnly>
        <button class="bg-neutral-200 px-2 py-1 rounded mt-4" @click="zoomOnDwightDesk">
            Zoom on Dwight's desk
        </button>
    </div>
</template>

<script setup lang="ts">

const floorPlanUrl = '/office_floor.jpg';
const markers = [
    {id: 1, x: 350, y: 1010, label: 'Michael'},
    {id: 2, x: 430, y: 620, label: 'Jim'},
    {id: 3, x: 530, y: 450, label: 'Dwight'},
    {id: 4, x: 130, y: 520, label: 'Pam'},
];

const floorMapRef = ref();

const zoomOnDwightDesk = () => {
    const dwightMarker = markers[3]
    floorMapRef.value?.zoomOnMarker(dwightMarker);
}
</script>

<style scoped>
#floor-map {
    height: 800px;
    width: 100%;
}
</style>