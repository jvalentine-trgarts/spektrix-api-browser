import type {
  SpektrixEvent,
  SpektrixInstance,
  Event,
  Instance,
  CustomAttributes,
  SpektrixEventXml,
  EventAvailability,
} from "~/types/spektrix";

import { XMLParser } from "fast-xml-parser";

/**
 * Extracts the custom attributes from a Spektrix object
 * @param obj Any object with attribute_* properties
 * @returns An object containing just the custom attributes with the attribute_ prefix removed
 */
function extractCustomAttributes(obj: Record<string, any>): CustomAttributes {
  const attributes: CustomAttributes = {};

  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("attribute_")) {
      // Remove the 'attribute_' prefix and add to attributes object
      const attributeName = key.replace("attribute_", "");
      attributes[attributeName] = value;
    }
  }

  return attributes;
}

/**
 * Transforms a SpektrixEvent into our custom Event format
 * @param event The raw event from the Spektrix API
 * @returns The transformed Event object
 */
export function transformEvent(event: SpektrixEvent): Event {
  // Extract all custom attributes
  const attributes = extractCustomAttributes(event);

  // Create a new object with all standard properties
  const transformedEvent: Event = {
    description: event.description,
    duration: event.duration,
    firstInstanceDateTime: event.firstInstanceDateTime,
    htmlDescription: event.htmlDescription,
    id: event.id,
    imageUrl: event.imageUrl,
    instanceDates: event.instanceDates,
    isOnSale: event.isOnSale,
    lastInstanceDateTime: event.lastInstanceDateTime,
    name: event.name,
    thumbnailUrl: event.thumbnailUrl,
    webEventId: event.webEventId,
    attributes,
  };

  return transformedEvent;
}

/**
 * Transforms a SpektrixInstance into our custom Instance format
 * @param instance The raw instance from the Spektrix API
 * @returns The transformed Instance object
 */
export function transformInstance(instance: SpektrixInstance): Instance {
  // Extract all custom attributes
  const attributes = extractCustomAttributes(instance);

  // Create a new object with all standard properties
  const transformedInstance: Instance = {
    event: instance.event,
    cancelled: instance.cancelled,
    hasBestAvailableOverlay: instance.hasBestAvailableOverlay,
    id: instance.id,
    isOnSale: instance.isOnSale,
    planId: instance.planId,
    priceList: instance.priceList,
    start: instance.start,
    startSellingAtWeb: instance.startSellingAtWeb,
    startSellingAtWebUtc: instance.startSellingAtWebUtc,
    startUtc: instance.startUtc,
    stopSellingAtWeb: instance.stopSellingAtWeb,
    stopSellingAtWebUtc: instance.stopSellingAtWebUtc,
    webInstanceId: instance.webInstanceId,
    attributes,
  };

  return transformedInstance;
}

/**
 * Transforms an array of SpektrixEvents into our custom Event format
 * @param events Array of raw events from the Spektrix API
 * @returns Array of transformed Event objects
 */
export function transformEvents(events: SpektrixEvent[]): Event[] {
  return events.map(transformEvent);
}

/**
 * Transforms an array of SpektrixInstances into our custom Instance format
 * @param instances Array of raw instances from the Spektrix API
 * @returns Array of transformed Instance objects
 */
export function transformInstances(instances: SpektrixInstance[]): Instance[] {
  return instances.map(transformInstance);
}

/**
 * Transforms Spektrix XML event data into aggregated availability metrics
 * @param xmlData Raw XML string from the Spektrix API
 * @returns Aggregated event availability metrics
 */
export function transformEventAvailability(xmlData: string): EventAvailability {
  // Parse XML response to JavaScript object
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
  });

  const parsedData = parser.parse(xmlData) as SpektrixEventXml;

  // Extract event times
  const eventTimes = Array.isArray(parsedData.Event.Times.EventTime)
    ? parsedData.Event.Times.EventTime
    : [parsedData.Event.Times.EventTime]; // Handle case where there's only one event time

  // Aggregate availability metrics
  const availability: EventAvailability = eventTimes.reduce(
    (acc, time) => {
      return {
        capacity: acc.capacity + Number(time.Capacity),
        available: acc.available + Number(time.SeatsAvailable),
        locked: acc.locked + Number(time.SeatsLocked),
        reserved: acc.reserved + Number(time.SeatsReserved),
        selected: acc.selected + Number(time.SeatsSelected),
        sold: acc.sold + Number(time.SeatsSold),
      };
    },
    {
      capacity: 0,
      available: 0,
      locked: 0,
      reserved: 0,
      selected: 0,
      sold: 0,
    }
  );

  return availability;
}
