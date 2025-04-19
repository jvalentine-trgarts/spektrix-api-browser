<script setup lang="ts">
const selectedEvent = useSelectedEvent();

import { formatDate, formatId } from "~/utils/formatters";
</script>

<template>
  <div>
    <div v-if="selectedEvent">
      <div class="flex items-center">
        <img
          v-if="selectedEvent.imageUrl != ''"
          class="inline-block object-cover size-24 rounded-md mr-6"
          :src="selectedEvent.imageUrl"
          :alt="selectedEvent.name"
        />
        <div>
          <h3 class="text-base font-semibold text-gray-900">
            {{ selectedEvent.name }}
          </h3>
          <p class="mt-1 text-sm text-gray-500 font-semibold">
            {{
              selectedEvent.firstInstanceDateTime ==
              selectedEvent.lastInstanceDateTime
                ? formatDate(selectedEvent.firstInstanceDateTime)
                : `${formatDate(
                    selectedEvent.firstInstanceDateTime
                  )} &bull; ${formatDate(selectedEvent.lastInstanceDateTime)}`
            }}
          </p>

          <p class="line-clamp-2 mt-1 max-w-2xl text-sm text-gray-500">
            {{ selectedEvent.description }}
          </p>
        </div>
      </div>

      <div>
        <div class="mt-6 border-t border-gray-200 -mx-6">
          <dl class="divide-y divide-gray-200">
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt>
                <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <dt class="sr-only">Name</dt>
                  <dd
                    class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                  >
                    description
                  </dd>
                  <dt class="sr-only">Type</dt>
                  <dd class="font-mono text-xs text-gray-400">
                    string || null
                  </dd>
                  <dt class="sr-only">Description</dt>
                  <dd class="text-xs text-gray-400 w-full flex-none">
                    <p>A plain text description of the event</p>
                  </dd>
                </dl>
              </dt>

              <dd
                class="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                <span class="grow">
                  <span v-if="selectedEvent.description">
                    {{ selectedEvent.description }}
                  </span>
                  <span
                    v-else
                    class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                  >
                    null
                  </span>
                </span>

                <span class="ml-4 shrink-0">
                  <!-- <button
                    type="button"
                    class="cursor-pointer rounded-md bg-white font-medium text-gray-300 hover:text-gray-500"
                  >
                    <Icon name="heroicons:clipboard-document-16-solid" />
                  </button> -->
                </span>
              </dd>
            </div>

            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt>
                <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <dt class="sr-only">Name</dt>
                  <dd
                    class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                  >
                    duration
                  </dd>
                  <dt class="sr-only">Type</dt>
                  <dd class="font-mono text-xs text-gray-400">
                    number || null
                  </dd>
                  <dt class="sr-only">Description</dt>
                  <dd class="text-xs text-gray-400 w-full flex-none">
                    <p>The duration of the event in minutes</p>
                  </dd>
                </dl>
              </dt>

              <dd
                class="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                <span class="grow">
                  <span v-if="selectedEvent.duration">
                    {{ selectedEvent.duration }}
                  </span>
                  <span
                    v-else
                    class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                  >
                    null
                  </span>
                </span>

                <span class="ml-4 shrink-0">
                  <!-- <button
                    type="button"
                    class="cursor-pointer rounded-md bg-white font-medium text-gray-300 hover:text-gray-500"
                  >
                    <Icon name="heroicons:clipboard-document-16-solid" />
                  </button> -->
                </span>
              </dd>
            </div>

            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt>
                <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <dt class="sr-only">Name</dt>
                  <dd
                    class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                  >
                    firstInstanceDateTime
                  </dd>
                  <dt class="sr-only">Type</dt>
                  <dd class="font-mono text-xs text-gray-400">isoDateString</dd>
                  <dt class="sr-only">Description</dt>
                  <dd class="text-xs text-gray-400 w-full flex-none">
                    <p>The datetime of the first performance of the event</p>
                  </dd>
                </dl>
              </dt>

              <dd
                class="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                <span class="grow">{{
                  selectedEvent.firstInstanceDateTime
                }}</span>
                <span class="ml-4 shrink-0">
                  <!-- <button
                    type="button"
                    class="cursor-pointer rounded-md bg-white font-medium text-gray-300 hover:text-gray-500"
                  >
                    <Icon name="heroicons:clipboard-document-16-solid" />
                  </button> -->
                </span>
              </dd>
            </div>

            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt>
                <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <dt class="sr-only">Name</dt>
                  <dd
                    class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                  >
                    htmlDescription
                  </dd>
                  <dt class="sr-only">Type</dt>
                  <dd class="font-mono text-xs text-gray-400">string</dd>
                  <dt class="sr-only">Description</dt>
                  <dd class="text-xs text-gray-400 w-full flex-none">
                    <p>
                      A html description of the event which returns an empty
                      &lt;div&gt; element if empty
                    </p>
                  </dd>
                </dl>
              </dt>

              <dd
                class="mt-1 flex font-mono text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                <span class="grow">{{ selectedEvent.htmlDescription }}</span>
                <span class="ml-4 shrink-0">
                  <!-- <button
                    type="button"
                    class="cursor-pointer rounded-md bg-white font-medium text-gray-300 hover:text-gray-500"
                  >
                    <Icon name="heroicons:clipboard-document-16-solid" />
                  </button> -->
                </span>
              </dd>
            </div>

            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt>
                <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <dt class="sr-only">Name</dt>
                  <dd
                    class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                  >
                    id
                  </dd>
                  <dt class="sr-only">Type</dt>
                  <dd class="font-mono text-xs text-gray-400">string</dd>
                  <dt class="sr-only">Description</dt>
                  <dd class="text-xs text-gray-400 w-full flex-none">
                    <p>The identifier for the event</p>
                  </dd>
                </dl>
              </dt>

              <dd
                class="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                <span class="grow">
                  <div>
                    <div>
                      <span
                        class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                      >
                        {{ selectedEvent.id }}
                      </span>
                    </div>

                    <div class="flex items-center">
                      <span class="text-xs"
                        >For API v2</span
                      >
                      <span
                        class="ml-2 font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                      >
                        {{ formatId(selectedEvent.id) }}
                      </span>
                    </div>
                  </div>
                </span>
                <span class="ml-4 shrink-0">
                  <!-- <button
                    type="button"
                    class="cursor-pointer rounded-md bg-white font-medium text-gray-300 hover:text-gray-500"
                  >
                    <Icon name="heroicons:clipboard-document-16-solid" />
                  </button> -->
                </span>
              </dd>
            </div>

            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt>
                <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <dt class="sr-only">Name</dt>
                  <dd
                    class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                  >
                    imageUrl
                  </dd>
                  <dt class="sr-only">Type</dt>
                  <dd class="font-mono text-xs text-gray-400">
                    string || null
                  </dd>
                  <dt class="sr-only">Description</dt>
                  <dd class="text-xs text-gray-400 w-full flex-none">
                    <p>A URI pointing to a hosted marketing image</p>
                  </dd>
                </dl>
              </dt>

              <dd
                class="mt-1 font-mono flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                <span class="grow">
                  <a
                    v-if="selectedEvent.imageUrl"
                    :href="selectedEvent.imageUrl"
                    target="_blank"
                  >
                    {{ selectedEvent.imageUrl }}
                  </a>
                  <span
                    v-else
                    class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                  >
                    null
                  </span>
                </span>
                <span class="ml-4 shrink-0">
                  <!-- <button
                    type="button"
                    class="cursor-pointer rounded-md bg-white font-medium text-gray-300 hover:text-gray-500"
                  >
                    <Icon name="heroicons:clipboard-document-16-solid" />
                  </button> -->
                </span>
              </dd>
            </div>

            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt>
                <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <dt class="sr-only">Name</dt>
                  <dd
                    class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                  >
                    instanceDates
                  </dd>
                  <dt class="sr-only">Type</dt>
                  <dd class="font-mono text-xs text-gray-400">string</dd>
                  <dt class="sr-only">Description</dt>
                  <dd class="text-xs text-gray-400 w-full flex-none">
                    <p>
                      The date of the first and last instance in short date
                      format
                    </p>
                  </dd>
                </dl>
              </dt>

              <dd
                class="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                <span class="grow">{{ selectedEvent.instanceDates }}</span>
                <span class="ml-4 shrink-0">
                  <!-- <button
                    type="button"
                    class="cursor-pointer rounded-md bg-white font-medium text-gray-300 hover:text-gray-500"
                  >
                    <Icon name="heroicons:clipboard-document-16-solid" />
                  </button> -->
                </span>
              </dd>
            </div>

            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt>
                <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <dt class="sr-only">Name</dt>
                  <dd
                    class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                  >
                    isOnSale
                  </dd>
                  <dt class="sr-only">Type</dt>
                  <dd class="font-mono text-xs text-gray-400">boolean</dd>
                  <dt class="sr-only">Description</dt>
                  <dd class="text-xs text-gray-400 w-full flex-none">
                    <p>A flag to indicate if the event is on sale</p>
                  </dd>
                </dl>
              </dt>

              <dd
                class="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                <span class="grow">
                  <span
                    v-if="selectedEvent.isOnSale == true"
                    class="font-mono inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-green-500/10 ring-inset"
                  >
                    {{ selectedEvent.isOnSale }}
                  </span>
                  <span
                    v-else
                    class="font-mono inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600 ring-1 ring-red-500/10 ring-inset"
                  >
                    {{ selectedEvent.isOnSale }}
                  </span>
                </span>
                <span class="ml-4 shrink-0">
                  <!-- <button
                    type="button"
                    class="cursor-pointer rounded-md bg-white font-medium text-gray-300 hover:text-gray-500"
                  >
                    <Icon name="heroicons:clipboard-document-16-solid" />
                  </button> -->
                </span>
              </dd>
            </div>

            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt>
                <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <dt class="sr-only">Name</dt>
                  <dd
                    class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                  >
                    lastInstanceDateTime
                  </dd>
                  <dt class="sr-only">Type</dt>
                  <dd class="font-mono text-xs text-gray-400">string</dd>
                  <dt class="sr-only">Description</dt>
                  <dd class="text-xs text-gray-400 w-full flex-none">
                    <p>The datetime of the last performance of the event</p>
                  </dd>
                </dl>
              </dt>

              <dd
                class="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                <span class="grow">{{
                  selectedEvent.lastInstanceDateTime
                }}</span>
                <span class="ml-4 shrink-0">
                  <!-- <button
                    type="button"
                    class="cursor-pointer rounded-md bg-white font-medium text-gray-300 hover:text-gray-500"
                  >
                    <Icon name="heroicons:clipboard-document-16-solid" />
                  </button> -->
                </span>
              </dd>
            </div>

            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt>
                <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <dt class="sr-only">Name</dt>
                  <dd
                    class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                  >
                    name
                  </dd>
                  <dt class="sr-only">Type</dt>
                  <dd class="font-mono text-xs text-gray-400">string</dd>
                  <dt class="sr-only">Description</dt>
                  <dd class="text-xs text-gray-400 w-full flex-none">
                    <p>The name of the event</p>
                  </dd>
                </dl>
              </dt>

              <dd
                class="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                <span class="grow">{{ selectedEvent.name }}</span>
                <span class="ml-4 shrink-0">
                  <!-- <button
                    type="button"
                    class="cursor-pointer rounded-md bg-white font-medium text-gray-300 hover:text-gray-500"
                  >
                    <Icon name="heroicons:clipboard-document-16-solid" />
                  </button> -->
                </span>
              </dd>
            </div>

            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt>
                <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <dt class="sr-only">Name</dt>
                  <dd
                    class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                  >
                    thumbnailUrl
                  </dd>
                  <dt class="sr-only">Type</dt>
                  <dd class="font-mono text-xs text-gray-400">
                    string || null
                  </dd>
                  <dt class="sr-only">Description</dt>
                  <dd class="text-xs text-gray-400 w-full flex-none">
                    <p>A URI pointing to a hosted thumbnail image</p>
                  </dd>
                </dl>
              </dt>

              <dd
                class="mt-1 font-mono flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                <span class="grow">
                  <a
                    v-if="selectedEvent.thumbnailUrl"
                    :href="selectedEvent.thumbnailUrl"
                    target="_blank"
                  >
                    {{ selectedEvent.thumbnailUrl }}
                  </a>
                  <span
                    v-else
                    class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                  >
                    null
                  </span>
                </span>
                <span class="ml-4 shrink-0">
                  <!-- <button
                    type="button"
                    class="cursor-pointer rounded-md bg-white font-medium text-gray-300 hover:text-gray-500"
                  >
                    <Icon name="heroicons:clipboard-document-16-solid" />
                  </button> -->
                </span>
              </dd>
            </div>

            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt>
                <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <dt class="sr-only">Name</dt>
                  <dd
                    class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                  >
                    webEventId
                  </dd>
                  <dt class="sr-only">Type</dt>
                  <dd class="font-mono text-xs text-gray-400">
                    string || null
                  </dd>
                  <dt class="sr-only">Description</dt>
                  <dd class="text-xs text-gray-400 w-full flex-none">
                    <p>An optional client specified identifier</p>
                  </dd>
                </dl>
              </dt>

              <dd
                class="mt-1 font-mono flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
              >
                <span class="grow">
                  <span v-if="selectedEvent.webEventId">
                    {{ selectedEvent.webEventId }}
                  </span>
                  <span
                    v-else
                    class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                  >
                    null
                  </span>
                </span>
                <span class="ml-4 shrink-0">
                  <!-- <button
                    type="button"
                    class="cursor-pointer rounded-md bg-white font-medium text-gray-300 hover:text-gray-500"
                  >
                    <Icon name="heroicons:clipboard-document-16-solid" />
                  </button> -->
                </span>
              </dd>
            </div>

            <template
              v-if="
                selectedEvent.attributes &&
                Object.keys(selectedEvent.attributes).length > 0
              "
            >
              <div class="bg-gray-50 px-4 py-3">
                <h4 class="text-base font-semibold text-gray-900">
                  Custom attributes
                </h4>

                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                  Spektrix allows additional custom attributes to be created.
                  These are set by the client and vary between systems. Values
                  are returned as
                  <span class="font-mono"
                    >string || number || boolean || null</span
                  >.
                </p>
              </div>

              <div
                v-for="(value, key) in selectedEvent.attributes"
                :key="key"
                class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
              >
                <dt>
                  <dl class="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <dt class="sr-only">Name</dt>
                    <dd
                      class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                    >
                      attribute_{{ key }}
                    </dd>
                  </dl>
                </dt>

                <dd
                  class="mt-1 font-mono flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"
                >
                  <span class="grow">
                    <span v-if="value">
                      {{ value }}
                    </span>
                    <span
                      v-else
                      class="font-mono inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset"
                    >
                      null
                    </span>
                  </span>
                  <span class="ml-4 shrink-0">
                    <button
                      type="button"
                      class="cursor-pointer rounded-md bg-white font-medium text-gray-300 hover:text-gray-500"
                    >
                      <Icon name="heroicons:clipboard-document-16-solid" />
                    </button>
                  </span>
                </dd>
              </div>
            </template>
          </dl>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="text-sm text-gray-500">
        Please select an event from the list to view details
      </p>
    </div>

    <div v-else class="border-l-4 border-gray-400 bg-gray-50 p-4">
      <div class="flex">
        <div class="shrink-0">
          <Icon
            name="heroicons:document-magnifying-glass-solid"
            class="size-5 text-gray-400"
          />
        </div>
        <div class="ml-3">
          <p class="text-sm text-gray-700">
            Select an event from the list to view details
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
