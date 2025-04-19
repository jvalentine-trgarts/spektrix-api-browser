import { ref } from "vue";
import type { Instance } from "~/types/spektrix";

export function useInstances(client: string) {
  const instances = ref<Instance[]>([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const fetchInstances = async (eventId?: string) => {
    if (!eventId) return;
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
    instances: readonly(instances),
    loading,
    error,
    fetchInstances,
  };
}
