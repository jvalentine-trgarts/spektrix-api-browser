<script setup lang="ts">
import type { Event } from "~/types/spektrix";

const props = defineProps<{
  events: Event[];
}>();

// Get the shared state for the selected event
const selectedEvent = useSelectedEvent();

// Function to handle event selection
function selectEvent(event: Event) {
  selectedEvent.value = event;
}
</script>

<template>
  <ul role="list" class="divide-y divide-gray-200">
    <li
      v-for="event in props.events"
      :key="event.id"
      @click="selectEvent(event)"
      :class="[{ 'bg-gray-100': selectedEvent?.id === event.id }, 'cursor-pointer py-4 px-6']"
    >
      <p class="text-sm/5 font-semibold text-gray-900">{{ event.name }}</p>
      <div class="text-xs text-gray-500">
        <p class="truncate">{{ event.description }}</p>
      </div>
    </li>
  </ul>
</template>
