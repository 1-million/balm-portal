<script setup lang="ts">
  import {ref} from "vue";

  const timelineData = ref([
    { time: '2025-10-27 10:00', title: '事件A', description: '事件A的详细描述', color: 'green' },
    { time: '2025-10-27 11:30', title: '事件B', description: '事件B的详细描述', color: 'blue' },
    { time: '2025-10-27 14:00', title: '事件C', description: '事件C的详细描述', color: 'orange' },
  ])
</script>

<template>
  <lay-timeline>
    <lay-timeline-item
        v-for="(event, index) in timelineData"
        :key="index"
        :timestamp="event.time"
        :color="event.color"
    >
      <lay-card shadow="hover">
        <h4>{{ event.title }}</h4>
        <p>{{ event.description }}</p>
      </lay-card>
    </lay-timeline-item>
  </lay-timeline>
</template>

<style scoped>

</style>