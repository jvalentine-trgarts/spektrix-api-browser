<script setup lang="ts">
import type { Event } from "~/types/spektrix";

const route = useRoute();
const client = route.params.client as string;

const props = defineProps<{
  events: Event[];
  loading: boolean;
  error: Error | null;
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
    <li v-if="props.error" class="py-4 px-6">
      <div class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="shrink-0">
            <Icon
              name="heroicons:exclamation-triangle-16-solid"
              class="size-5 text-red-400"
            />
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              Unable to retrieve events
            </h3>
          </div>
        </div>
        <div class="text-sm text-red-700">
          <p>
            There was an error retrieving the events for
            <span class="font-mono">{{ client }}</span
            >. Is this a valid Spektrix system name?
          </p>
        </div>
      </div>
    </li>

    <li
      v-else-if="props.loading"
      v-for="i in 10"
      class="py-4 px-6 animate-pulse"
    >
      <div class="h-2.5 bg-gray-200 rounded-full"></div>
      <div class="h-2 bg-gray-200 rounded-full max-w-2/3 mt-2"></div>
    </li>
    <li
      v-else
      v-for="event in props.events"
      :key="event.id"
      @click="selectEvent(event)"
      :class="[
        { 'bg-gray-100': selectedEvent?.id === event.id },
        'cursor-pointer py-4 px-6',
      ]"
    >
      <p class="text-sm/5 font-semibold text-gray-900">{{ event.name }}</p>
      <div class="text-xs text-gray-500">
        <p class="truncate">{{ event.description }}</p>
      </div>
    </li>
  </ul>
</template>
