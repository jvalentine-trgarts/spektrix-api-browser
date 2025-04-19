import { ref, computed } from "vue";
import type { Event, Instance } from "~/types/spektrix";

export function useEvents(client: string, eventId: string) {
  const instances = ref<Instance[]>([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const fetchInstances = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<{ instances: Instance[] }>(
        `/api/${client}/instances?eventId=${eventId}`
      );
      instances.value = response.instances;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error("Unknown error");
    } finally {
      loading.value = false;
    }
  };

  return {
    instances,
    loading,
    error,
    fetchInstances,
  };
}
