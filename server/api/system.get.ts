import axios from "axios";
import * as cheerio from "cheerio";
import { createError } from "h3";

interface ClientInfo {
  source: string;
  systemName: string;
  clientName: string;
  clientInitials: string;
}

interface QueryParams {
  systemName?: string;
  [key: string]: string | string[] | undefined;
}

function getCompanyInitials(name: string): string {
  const words = name.split(" ");

  if (words.length === 1) {
    return [...words[0]][0] || "";
  } else {
    const firstInitial = [...words[0]][0] || "";
    const secondInitial = [...words[1]][0] || "";
    return firstInitial + secondInitial;
  }
}

export default defineEventHandler(
  async (event): Promise<ClientInfo> => {
    const query = getQuery(event) as QueryParams;
    const systemName = query.systemName;

    if (!systemName) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required parameter: systemName",
      });
    }

    const url = `https://system.spektrix.com/${systemName}/client/Login.aspx`;
    const elementId = "ClientName";

    try {
      const response = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });

      const html = response.data;
      const $ = cheerio.load(html);
      const clientNameElement = $(`#${elementId}`);

      if (clientNameElement.length === 0) {
        throw createError({
          statusCode: 404,
          statusMessage: `Element with ID "${elementId}" not found`,
        });
      }

      const clientName = clientNameElement
        .text()
        .trim()
        .replace(/ Login$/, "");

      const clientInitials = getCompanyInitials(clientName);

      return {
        source: url,
        systemName,
        clientName,
        clientInitials,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw createError({
          statusCode: error.response?.status || 500,
          statusMessage: `Failed to fetch data: ${error.message}`,
        });
      }
      throw error;
    }
  }
);
