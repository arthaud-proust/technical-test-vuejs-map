<template>
    <div>
        <h1>Floor Map</h1>
        <client-only>
            <FloorMap ref="floorMap" id="floor-map" :markers="markers" :floorPlanUrl="floorPlanUrl" />
        </client-only>
    </div>
</template>

<script setup lang="ts">
import FloorMap from "~/components/FloorMap.vue";

const floorPlanUrl = '/office_floor.jpg'; // Path to the floor plan image
const markers = [
    {id: 1, x: 350, y: 1010, label: 'Michael'},
    {id: 1, x: 430, y: 620, label: 'Jim'},
    {id: 1, x: 530, y: 450, label: 'Dwight'},
    {id: 1, x: 130, y: 520, label: 'Pam'},
];
</script>

<style scoped>
#floor-map {
    height: 800px;
    width: 100%;
}
</style>