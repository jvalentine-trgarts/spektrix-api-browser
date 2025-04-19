import type { Event } from '~/types/spektrix';
export const useSelectedEvent = () => useState<Event | null>('selectedEvent', () => null);