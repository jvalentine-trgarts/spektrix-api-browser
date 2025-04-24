<script setup lang="ts">
import { useStorage } from "@vueuse/core";

interface SystemItem {
  systemName: string;
  clientName: string;
  clientInitials: string;
}

const defaultSystems: SystemItem[] = [];
const recentSystems = useStorage<SystemItem[]>(
  "recent-systems",
  defaultSystems
);

const systemName = ref("");
</script>

<template>
  <div class="flex items-center justify-center h-full">
    <div class="max-w-lg">
      <div>
        <div class="text-center">
          <Icon
            name="heroicons:circle-stack"
            class="mx-auto size-12 text-gray-400"
          />
          <h2 class="mt-2 text-base font-semibold text-gray-900">
            Connect to a Spektrix system
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Enter the name of the Spektrix system you want to connect to. The
            Spektrix system name can be found in the address of any Spektrix
            page.
          </p>
        </div>
        <form @submit.prevent class="mt-6 flex">
          <div class="w-full">
            <label for="system-name" class="sr-only"
              >Spektrix system name</label
            >
            <div>
              <div
                class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
              >
                <div
                  class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"
                >
                  https://system.spektrix.com/
                </div>
                <input
                  type="text"
                  name="system-name"
                  v-model="systemName"
                  id="system-name"
                  class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  placeholder="systemname"
                />
              </div>
            </div>
          </div>
          <nuxt-link
            :to="`/${systemName.toLowerCase()}`"
            class="ml-4 shrink-0 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Connect
          </nuxt-link>
        </form>
      </div>
      <div class="mt-10">
        <h3 class="text-sm font-medium text-gray-500">
          Previously used Spektrix systems
        </h3>
        <ul
          role="list"
          class="mt-4 h-55 divide-y divide-gray-200 border-t border-b border-gray-200"
        >
          <li
            v-if="!recentSystems || recentSystems.length == 0"
            class="flex items-center justify-between space-x-3 py-4"
          >
            <div class="flex min-w-0 flex-1 items-center space-x-3">
              <div class="shrink-0">
                <span
                  class="inline-block size-10 p-2 overflow-hidden rounded-full bg-gray-100"
                >
                  <Icon
                    name="heroicons:circle-stack-16-solid"
                    class="size-full text-gray-300"
                  />
                </span>
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-medium text-gray-900">
                  No previous connections
                </p>
                <p class="truncate text-sm font-medium text-gray-500">
                  Systems which you have previously connected to will be shown
                  here.
                </p>
              </div>
            </div>
          </li>

          <li
            v-for="system in recentSystems"
            class="flex items-center justify-between space-x-3 py-4"
          >
            <div class="flex min-w-0 flex-1 items-center space-x-3">
              <div class="shrink-0">
                <span
                  class="inline-flex size-10 items-center justify-center rounded-full bg-gray-300"
                >
                  <span class="font-medium text-white">{{
                    system.clientInitials
                  }}</span>
                </span>
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-medium text-gray-900">
                  {{ system.clientName }}
                </p>
                <p class="truncate text-sm font-mono font-medium text-gray-500">
                  {{ system.systemName }}
                </p>
              </div>
            </div>
            <div class="shrink-0">
              <nuxt-link
                :to="`/${system.systemName}`"
                class="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                >Connect</nuxt-link
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
