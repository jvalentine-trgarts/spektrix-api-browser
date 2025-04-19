import { z } from "zod";
import type { SpektrixEvent, Event } from "~/types/spektrix";
import { transformEvents } from "~/utils/spektrix-transformers";

const routeParamsSchema = z.object({
  client: z.string().min(1, "Client parameter is required"),
});

export default defineEventHandler(async (event) => {
  const client = getRouterParam(event, "client");

  try {
    routeParamsSchema.parse({ client });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        message: error.errors?.[0]?.message || "Invalid request parameters",
      });
    }
  }

  // Fetch raw data from Spektrix API
  const response = await $fetch<SpektrixEvent[]>(
    `https://system.spektrix.com/${client}/api/v3/events`
  );

  // Transform the data before returning
  const transformedEvents = transformEvents(response);

  // Return the transformed data
  return {
    events: transformedEvents,
  };
});
