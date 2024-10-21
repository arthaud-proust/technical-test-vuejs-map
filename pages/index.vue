<template>
    <div class="container mx-auto">
        <h1 class="mt-4 ">Floor Map</h1>
        <ClientOnly>
            <FloorMap ref="floorMapRef" id="floor-map" class="mt-4" :markers="markers" :floorPlanUrl="floorPlanUrl">
                <template #marker="{label, imageUrl}">
                    <FloorMapMarker :label="label" :imageUrl="imageUrl" />
                </template>
            </FloorMap>
        </ClientOnly>
        <button class="bg-neutral-200 px-2 py-1 rounded mt-4" @click="zoomOnDwightDesk">
            Zoom on Dwight's desk
        </button>
    </div>
</template>

<script setup lang="ts">

const floorPlanUrl = '/office_floor.jpg';
const markers = [
    {id: 1, x: 350, y: 1010, label: 'Michael', imageUrl: '/avatars/michael.jpg'},
    {id: 2, x: 430, y: 620, label: 'Jim', imageUrl: '/avatars/jim.jpg'},
    {id: 3, x: 530, y: 450, label: 'Dwight', imageUrl: '/avatars/dwight.jpg'},
    {id: 4, x: 130, y: 520, label: 'Pam', imageUrl: '/avatars/pam.jpg'},
];

const floorMapRef = ref();

const zoomOnDwightDesk = () => {
    const dwightMarker = markers[2]
    floorMapRef.value?.zoomOnMarker(dwightMarker);
}
</script>

<style scoped>
#floor-map {
    height: 800px;
    width: 100%;
}
</style>