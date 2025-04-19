import { ref, computed } from 'vue'
import type { Event } from '~/types/spektrix'

export function useEvents(client: string) {
  const events = ref<Event[]>([])
  const nameFilter = ref('')
  const loading = ref(false)
  const error = ref<Error | null>(null)
  
  const filteredEvents = computed(() => {
    return events.value.filter(event => 
      event.name.toLowerCase().includes(nameFilter.value.toLowerCase())
    )
  })
  
  const fetchEvents = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch<{ events: Event[] }>(`/api/${client}/events`)
      events.value = response.events
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Unknown error');
    } finally {
      loading.value = false
    }
  }
  
  return {
    events: readonly(events),
    nameFilter,
    filteredEvents,
    loading,
    error,
    fetchEvents
  }
}