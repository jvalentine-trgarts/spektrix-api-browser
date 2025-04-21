import { ref } from 'vue'
import type { EventAvailability } from '~/types/spektrix'

export function useEventAvailability(client: string) {
  const availability = ref<EventAvailability | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchAvailability = async (eventId: string) => {
    if (!eventId) return

    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch<{ eventAvailability: EventAvailability }>(
        `/api/${client}/event`,
        {
          params: { eventId }
        }
      )
      
      availability.value = response.eventAvailability
    } catch (err) {
      console.error(`Error fetching availability for event ${eventId}:`, err)
      error.value = err instanceof Error ? err : new Error('Unknown error')
      availability.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    availability: readonly(availability),
    loading: readonly(loading),
    error: readonly(error),
    fetchAvailability
  }
}