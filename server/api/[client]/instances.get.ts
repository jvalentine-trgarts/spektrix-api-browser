import { z } from "zod";
import type { SpektrixInstance, Instance } from "~/types/spektrix";
import { transformInstances } from "~/utils/spektrix-transformers";

const routeParamsSchema = z.object({
  client: z.string().min(1, "Client parameter is required"),
  eventId: z.string().min(1, "Event ID parameter is required"),
});

export default defineEventHandler(async (event) => {
  const client = getRouterParam(event, "client");
  const query = getQuery(event);
  const eventId = query.eventId;

  try {
    routeParamsSchema.parse({ client, eventId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        message: error.errors?.[0]?.message || "Invalid request parameters",
      });
    }
  }

  try {
    // Fetch raw data from Spektrix API
    const response = await $fetch<SpektrixInstance[]>(
      `https://system.spektrix.com/${client}/api/v3/events/${eventId}/instances`
    );

    // Transform the data before returning
    const transformedInstances = transformInstances(response);

    // Return the transformed data
    return {
      instances: transformedInstances,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Error fetching instances for event ${eventId} and client ${client}`,
    });
  }
});
