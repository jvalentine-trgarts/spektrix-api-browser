<script setup lang="ts">
import { formatDate } from '~/utils/formatters';

const route = useRoute();
const client = route.params.client as string;
const selectedEvent = useSelectedEvent();

const { fetchInstances, instances, loading, error } = useInstances(client);

watch(
  () => selectedEvent.value?.id,
  (newId) => {
    if (newId) {
      fetchInstances(newId);
    }
  },
  { immediate: true }
);
</script>

<template>
  <span v-if="selectedEvent">
    <h3 class="text-base font-semibold text-gray-900">Instances</h3>

    <ul role="list" class="divide-y divide-gray-200 -mx-6">
      <li v-for="instance in instances" class="py-4 px-6">
        <h4 class="text-gray-900 font-semibold text-sm">{{
          formatDate(instance.startUtc)
        }}</h4>
        <span
          class="font-mono mt-2 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
          >{{ instance.id }}</span
        >

        <div
          class="mt-2 p-3 border border-gray-200 rounded-md text-xs text-gray-500 flex flex-col space-y-1"
        >
          <div class="flex items-center justify-between flex-wrap" v-for="(value, key) in instance.attributes">
            <span
              class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
            >
              attribute_{{ key }}
            </span>
             {{ value }}
          </div>
        </div>
      </li>
    </ul>
  </span>
</template>
