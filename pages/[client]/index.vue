<script setup lang="ts">
const route = useRoute();
import { useStorage } from "@vueuse/core";
import InstanceDetails from "~/components/instance-details.vue";

watch(
  () => route.fullPath,
  () => {
    const selectedEvent = useSelectedEvent();
    selectedEvent.value = null;
  }
);

const client = route.params.client as string;
interface SystemItem {
  systemName: string;
  clientName: string;
  clientInitials: string;
}

const clientDetails = ref<SystemItem>({
  systemName: "",
  clientName: "",
  clientInitials: "",
});

const defaultSystems: SystemItem[] = [];
const recentSystems = useStorage<SystemItem[]>(
  "recent-systems",
  defaultSystems
);
const addRecentSystem = (system: SystemItem) => {
  const updatedSystems = [...recentSystems.value];

  const existingIndex = updatedSystems.findIndex(
    (item) => item.systemName === system.systemName
  );

  if (existingIndex !== -1) {
    updatedSystems.splice(existingIndex, 1);
  }

  updatedSystems.unshift(system);

  recentSystems.value = updatedSystems.slice(0, 3);
};
const { nameFilter, filteredEvents, loading, error, fetchEvents } =
  useEvents(client);

onMounted(() => {
  fetchEvents();

  (async () => {
    try {
      const details = await $fetch<SystemItem>(
        `/api/system?systemName=${client}`
      );
      clientDetails.value = details;
      addRecentSystem(details);
    } catch (err) {
      console.error("Failed to fetch client details:", err);
    }
  })();

  const selectedEvent = useSelectedEvent();
  selectedEvent.value = null;
});
</script>

<template>
  <div>
    <!-- Static sidebar for desktop -->
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
    >
      <div
        class="flex grow flex-col gap-y-5 border-r border-gray-200 bg-white px-6 h-screen"
      >
        <nuxt-link
          to="/"
          class="flex min-w-0 items-center space-x-3 px-3 py-2 border border-gray-200 bg-gray-50 rounded-md mt-6"
        >
          <div class="shrink-0">
            <span
              class="inline-flex size-10 items-center justify-center rounded-full bg-gray-500"
            >
              <span class="font-medium text-white">{{
                clientDetails.clientInitials
              }}</span>
            </span>
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium text-gray-900">
              {{ clientDetails.clientName }}
            </p>
            <p class="truncate text-sm font-mono font-medium text-gray-500">
              {{ clientDetails.systemName }}
            </p>
          </div>
        </nuxt-link>
        <div>
          <label
            for="search-name"
            class="block text-sm/6 font-semibold text-gray-900"
            >Filter events by name</label
          >
          <div class="mt-1 grid grid-cols-1">
            <input
              v-model="nameFilter"
              type="text"
              name="search-name"
              id="search-name"
              class="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-10 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pr-9 sm:text-sm/6"
            />

            <Icon
              name="heroicons:magnifying-glass-16-solid"
              class="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-gray-400 sm:size-4"
            />
          </div>
        </div>

        <nav class="flex flex-1 flex-col overflow-y-auto mb-6">
          <EventList :events="filteredEvents" :loading="loading" :error="error" />
        </nav>
      </div>
    </div>

    <div
      class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-xs sm:px-6 lg:hidden"
    >
      <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden">
        <span class="sr-only">Open sidebar</span>
        <svg
          class="size-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <div class="flex-1 text-sm/6 font-semibold text-gray-900">Dashboard</div>
      <a href="#">
        <span class="sr-only">Your profile</span>
        <img
          class="size-8 rounded-full bg-gray-50"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </a>
    </div>

    <main class="lg:pl-72">
      <div class="xl:pr-96">
        <div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
          <EventDetails />
        </div>
      </div>
    </main>

    <aside
      class="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block"
    >
      <InstanceDetails />
    </aside>
  </div>

</template>
