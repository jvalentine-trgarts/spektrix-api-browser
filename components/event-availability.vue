<script lang="ts" setup>
import { formatPercentage, formatNumber } from "#imports";

const selectedEvent = useSelectedEvent();
const route = useRoute();
const client = route.params.client as string;

const { availability, loading, error, fetchAvailability } =
  useEventAvailability(client);

watch(
  () => selectedEvent.value?.id,
  (newEventId) => {
    if (newEventId) {
      fetchAvailability(newEventId);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div v-if="error" class="rounded-md bg-red-50 p-4">
    <div class="flex">
      <div class="shrink-0">
        <Icon
          name="heroicons:exclamation-triangle-16-solid"
          class="size-5 text-red-400"
        />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">
          Event availability unavailable
        </h3>
        <div class="mt-2 text-sm text-red-700">
          <p>There was an error retrieving the availability for this event.</p>
        </div>
      </div>
    </div>
  </div>

  <dl
    v-else-if="loading"
    class="mx-auto grid gap-px bg-gray-200 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 border-t border-gray-200"
  >
    <div
      v-for="metric in [
        'Capacity',
        'Sold',
        'Reserved',
        'Selected',
        'Locked',
        'Available',
      ]"
      class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 bg-white px-6 py-4 animate-pulse"
    >
      <dt class="text-sm/6 font-medium text-gray-500">{{ metric }}</dt>

      <div class="h-3.5 bg-gray-200 rounded-full w-1/8"></div>

      <dd
        class="w-full flex-none text-xl font-medium tracking-tight text-gray-900"
      >
        <div class="h-7 bg-gray-200 rounded-full w-1/2"></div>
      </dd>
    </div>
  </dl>

  <dl
    v-else
    class="mx-auto grid gap-px bg-gray-200 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 border-t border-gray-200"
  >
    <div
      class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 bg-white px-6 py-4"
    >
      <dt class="text-sm/6 font-medium text-gray-500">Capacity</dt>
      <dd
        class="w-full flex-none text-xl font-medium tracking-tight text-gray-900"
      >
        {{ formatNumber(availability?.capacity) }}
      </dd>
    </div>
    <div
      class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 bg-white px-6 py-4"
    >
      <dt class="text-sm/6 font-medium text-gray-500">Sold</dt>
      <dd class="text-xs font-medium text-gray-600">
        {{
          formatPercentage(
            (availability?.sold || 0) / (availability?.capacity || 0),
            0
          )
        }}
      </dd>
      <dd
        class="w-full flex-none text-xl font-medium tracking-tight text-gray-900"
      >
        {{ formatNumber(availability?.sold) }}
      </dd>
    </div>
    <div
      class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 bg-white px-6 py-4"
    >
      <dt class="text-sm/6 font-medium text-gray-500">Reserved</dt>
      <dd class="text-xs font-medium text-gray-600">
        {{
          formatPercentage(
            (availability?.reserved || 0) / (availability?.capacity || 0),
            0
          )
        }}
      </dd>
      <dd
        class="w-full flex-none text-xl font-medium tracking-tight text-gray-900"
      >
        {{ formatNumber(availability?.reserved) }}
      </dd>
    </div>

    <div
      class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 bg-white px-6 py-4"
    >
      <dt class="text-sm/6 font-medium text-gray-500">Selected</dt>
      <dd class="text-xs font-medium text-gray-600">
        {{
          formatPercentage(
            (availability?.selected || 0) / (availability?.capacity || 0),
            0
          )
        }}
      </dd>
      <dd
        class="w-full flex-none text-xl font-medium tracking-tight text-gray-900"
      >
        {{ formatNumber(availability?.selected) }}
      </dd>
    </div>

    <div
      class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 bg-white px-6 py-4"
    >
      <dt class="text-sm/6 font-medium text-gray-500">Locked</dt>
      <dd class="text-xs font-medium text-gray-600">
        {{
          formatPercentage(
            (availability?.locked || 0) / (availability?.capacity || 0),
            0
          )
        }}
      </dd>
      <dd
        class="w-full flex-none text-xl font-medium tracking-tight text-gray-900"
      >
        {{ formatNumber(availability?.locked) }}
      </dd>
    </div>

    <div
      class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 bg-white px-6 py-4"
    >
      <dt class="text-sm/6 font-medium text-gray-500">Available</dt>
      <dd class="text-xs font-medium text-gray-600">
        {{
          formatPercentage(
            (availability?.available || 0) / (availability?.capacity || 0),
            0
          )
        }}
      </dd>
      <dd
        class="w-full flex-none text-xl font-medium tracking-tight text-gray-900"
      >
        {{ formatNumber(availability?.available) }}
      </dd>
    </div>
  </dl>
</template>
