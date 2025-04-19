<script setup lang="ts">
import { formatDate, formatId } from "~/utils/formatters";

const route = useRoute();
const client = route.params.client as string;
const selectedEvent = useSelectedEvent();

const { fetchInstances, instances, loading, error } = useInstances(client);

// Track which instances have expanded attributes
const expandedInstances = ref<Set<string>>(new Set());

// Toggle expanded state for an instance
const toggleAttributes = (instanceId: string) => {
  if (expandedInstances.value.has(instanceId)) {
    expandedInstances.value.delete(instanceId);
  } else {
    expandedInstances.value.add(instanceId);
  }
};

// Check if an instance is expanded
const isExpanded = (instanceId: string) => {
  return expandedInstances.value.has(instanceId);
};

watch(
  () => selectedEvent.value?.id,
  (newId) => {
    if (newId) {
      fetchInstances(newId);
      // Reset expanded state when loading new instances
      expandedInstances.value.clear();
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
        <h4 class="text-gray-900 font-semibold text-sm">
          {{ formatDate(instance.startUtc) }}
        </h4>

        <div class="mt-4 text-xs text-gray-500 flex flex-col space-y-1">


          <dl class="flex items-center justify-between flex-wrap">
            <dt>
              <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                <dt class="sr-only">Name</dt>
                <dd
                  class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                >
                  cancelled
                </dd>
                <dt class="sr-only">Type</dt>
                <dd class="font-mono text-gray-400">boolean</dd>
              </dl>
            </dt>
            <dd>
              <span
                v-if="instance.cancelled == true"
                class="font-mono inline-flex items-center rounded-md bg-green-50 px-2 py-1 font-medium text-green-600 ring-1 ring-green-500/10 ring-inset"
              >
                {{ instance.cancelled }}
              </span>
              <span
                v-else
                class="font-mono inline-flex items-center rounded-md bg-red-50 px-2 py-1 font-medium text-red-600 ring-1 ring-red-500/10 ring-inset"
              >
                {{ instance.cancelled }}
              </span>
            </dd>
          </dl>

          <dl class="flex items-center justify-between flex-wrap">
            <dt>
              <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                <dt class="sr-only">Name</dt>
                <dd
                  class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                >
                  hasBestAvailableOverlay
                </dd>
                <dt class="sr-only">Type</dt>
                <dd class="font-mono text-gray-400">boolean</dd>
              </dl>
            </dt>
            <dd>
              <span
                v-if="instance.hasBestAvailableOverlay == true"
                class="font-mono inline-flex items-center rounded-md bg-green-50 px-2 py-1 font-medium text-green-600 ring-1 ring-green-500/10 ring-inset"
              >
                {{ instance.hasBestAvailableOverlay }}
              </span>
              <span
                v-else
                class="font-mono inline-flex items-center rounded-md bg-red-50 px-2 py-1 font-medium text-red-600 ring-1 ring-red-500/10 ring-inset"
              >
                {{ instance.hasBestAvailableOverlay }}
              </span>
            </dd>
          </dl>

          <dl class="flex items-center justify-between flex-wrap">
            <dt>
              <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                <dt class="sr-only">Name</dt>
                <dd
                  class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                >
                  id
                </dd>
                <dt class="sr-only">Type</dt>
                <dd class="font-mono text-gray-400">string</dd>
              </dl>
            </dt>
            <dd>
              <span
                class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
              >
                {{ instance.id }}
              </span>
            </dd>
          </dl>

          <dl class="flex items-center justify-between flex-wrap">
            <dt>
              <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                <dt class="sr-only">Name</dt>
                <dd
                  class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                >
                  id
                </dd>
                <dt class="sr-only">Type</dt>
                <dd class="font-mono text-gray-400">string</dd>
                <span>for API v2</span>
              </dl>
            </dt>
            <dd>
              <span
                class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
              >
                {{ formatId(instance.id) }}
              </span>
            </dd>
          </dl>

          <dl class="flex items-center justify-between flex-wrap">
            <dt>
              <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                <dt class="sr-only">Name</dt>
                <dd
                  class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                >
                  isOnSale
                </dd>
                <dt class="sr-only">Type</dt>
                <dd class="font-mono text-gray-400">boolean</dd>
              </dl>
            </dt>
            <dd>
              <span
                v-if="instance.isOnSale == true"
                class="font-mono inline-flex items-center rounded-md bg-green-50 px-2 py-1 font-medium text-green-600 ring-1 ring-green-500/10 ring-inset"
              >
                {{ instance.isOnSale }}
              </span>
              <span
                v-else
                class="font-mono inline-flex items-center rounded-md bg-red-50 px-2 py-1 font-medium text-red-600 ring-1 ring-red-500/10 ring-inset"
              >
                {{ instance.isOnSale }}
              </span>
            </dd>
          </dl>

          <dl class="flex items-center justify-between flex-wrap">
            <dt>
              <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                <dt class="sr-only">Name</dt>
                <dd
                  class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                >
                  start
                </dd>
                <dt class="sr-only">Type</dt>
                <dd class="font-mono text-gray-400">string</dd>
              </dl>
            </dt>
            <dd>
              <span>
                {{ instance.start }}
              </span>
            </dd>
          </dl>

          <dl class="flex items-center justify-between flex-wrap">
            <dt>
              <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                <dt class="sr-only">Name</dt>
                <dd
                  class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                >
                  startSellingAtWeb
                </dd>
                <dt class="sr-only">Type</dt>
                <dd class="font-mono text-gray-400">string</dd>
              </dl>
            </dt>
            <dd>
              <span>
                {{ instance.startSellingAtWeb }}
              </span>
            </dd>
          </dl>

          <dl class="flex items-center justify-between flex-wrap">
            <dt>
              <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                <dt class="sr-only">Name</dt>
                <dd
                  class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                >
                  startSellingAtWebUtc
                </dd>
                <dt class="sr-only">Type</dt>
                <dd class="font-mono text-gray-400">string</dd>
              </dl>
            </dt>
            <dd>
              <span>
                {{ instance.startSellingAtWebUtc }}
              </span>
            </dd>
          </dl>

          <dl class="flex items-center justify-between flex-wrap">
            <dt>
              <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                <dt class="sr-only">Name</dt>
                <dd
                  class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                >
                  startUtc
                </dd>
                <dt class="sr-only">Type</dt>
                <dd class="font-mono text-gray-400">string</dd>
              </dl>
            </dt>
            <dd>
              <span>
                {{ instance.startUtc }}
              </span>
            </dd>
          </dl>

          <dl class="flex items-center justify-between flex-wrap">
            <dt>
              <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                <dt class="sr-only">Name</dt>
                <dd
                  class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                >
                  stopSellingAtWeb
                </dd>
                <dt class="sr-only">Type</dt>
                <dd class="font-mono text-gray-400">string</dd>
              </dl>
            </dt>
            <dd>
              <span>
                {{ instance.stopSellingAtWeb }}
              </span>
            </dd>
          </dl>

          <dl class="flex items-center justify-between flex-wrap">
            <dt>
              <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                <dt class="sr-only">Name</dt>
                <dd
                  class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                >
                  stopSellingAtWebUtc
                </dd>
                <dt class="sr-only">Type</dt>
                <dd class="font-mono text-gray-400">string</dd>
              </dl>
            </dt>
            <dd>
              <span>
                {{ instance.stopSellingAtWebUtc }}
              </span>
            </dd>
          </dl>

          <dl class="flex items-center justify-between flex-wrap">
            <dt>
              <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                <dt class="sr-only">Name</dt>
                <dd
                  class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                >
                  webInstanceId
                </dd>
                <dt class="sr-only">Type</dt>
                <dd class="font-mono text-gray-400">string || null</dd>
              </dl>
            </dt>
            <dd>
              <span class="font-mono" v-if="instance.webInstanceId">
                {{ instance.webInstanceId }}
              </span>
              <span
                v-else
                class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
              >
                null
              </span>
            </dd>
          </dl>
        </div>

        <div
          v-if="
            instance.attributes && Object.keys(instance.attributes).length > 0
          "
          class="mt-4 border border-gray-200 rounded-md text-xs text-gray-500 flex flex-col space-y-1"
        >
          <div
            @click="toggleAttributes(instance.id)"
            class="flex p-3 items-center justify-between cursor-pointer"
          >
            <span class="text-sm font-semibold text-gray-900">
              Custom attributes
            </span>
            <svg
              :class="isExpanded(instance.id) ? 'rotate-180' : ''"
              class="ml-2 h-4 w-4 transition-transform duration-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="pt-0 p-3" v-if="isExpanded(instance.id)">
            <div
              class="flex items-center justify-between flex-wrap"
              v-for="(value, key) in instance.attributes"
            >
              <span
                class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
              >
                attribute_{{ key }}
              </span>

              <span class="font-mono" v-if="value">
                {{ value }}
              </span>
              <span
                v-else
                class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
              >
                null
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </span>
</template>
