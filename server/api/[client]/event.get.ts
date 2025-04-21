import { z } from "zod";
import { formatId } from "~/utils/formatters";
import { transformEventAvailability } from "~/utils/spektrix-transformers";

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
    // Format the provided ID as a v1/v2 style ID
    const formattedId = formatId(eventId as string);

    // Fetch raw data from Spektrix API
    const response = await $fetch<string>(
      `https://system.spektrix.com/${client}/api/v1/eventsrestful.svc/details/${formattedId}`
    );

    // Transform the XML data to get availability metrics
    const availability = transformEventAvailability(response);

    // Return only the availability data
    return {
      eventAvailability: availability,
    };
  } catch (error) {
    console.error("Error processing event availability:", error);
    throw createError({
      statusCode: 500,
      message: `Error fetching availability for event ${eventId} and client ${client}`,
    });
  }
});