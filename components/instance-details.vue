<script setup lang="ts">
const selectedEvent = useSelectedEvent();

const { instances, loading, error } = useInstances(client, selectedEvent.id);
</script>

<template>
  <span v-if="selectedEvent">
    {{ selectedEvent.id }}
  </span>
</template>
