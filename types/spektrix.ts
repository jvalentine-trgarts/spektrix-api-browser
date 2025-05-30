export interface SpektrixEvent {
  description: string;
  duration: number;
  firstInstanceDateTime: string;
  htmlDescription: string;
  id: string;
  imageUrl: string;
  instanceDates: string;
  isOnSale: boolean;
  lastInstanceDateTime: string;
  name: string;
  thumbnailUrl: string;
  webEventId: string | null;
  // Client-specific attributes
  [key: `attribute_${string}`]: string | number | boolean | null;
}

export interface SpektrixInstance {
  /**
   * The ID of the event this instance belongs to.
   * References the `id` property of a SpektrixEvent.
   */
  event: string;
  cancelled: boolean;
  hasBestAvailableOverlay: boolean;
  id: string;
  isOnSale: boolean;
  planId: string;
  priceList: string;
  start: string;
  startSellingAtWeb: string;
  startSellingAtWebUtc: string;
  startUtc: string;
  stopSellingAtWeb: string;
  stopSellingAtWebUtc: string;
  webInstanceId: string | null;
  // Client-specific attributes
  [key: `attribute_${string}`]: string | number | boolean | null;
}

export interface CustomAttributes {
  [key: string]: string | number | boolean | null;
}

export interface Event {
  description: string;
  duration: number;
  firstInstanceDateTime: string;
  htmlDescription: string;
  id: string;
  imageUrl: string;
  instanceDates: string;
  isOnSale: boolean;
  lastInstanceDateTime: string;
  name: string;
  thumbnailUrl: string;
  webEventId: string | null;
  // Client-specific attributes
  attributes: CustomAttributes;
}

export interface Instance {
  /**
   * The ID of the event this instance belongs to.
   * References the `id` property of a SpektrixEvent.
   */
  event: string;
  cancelled: boolean;
  hasBestAvailableOverlay: boolean;
  id: string;
  isOnSale: boolean;
  planId: string;
  priceList: string;
  start: string;
  startSellingAtWeb: string;
  startSellingAtWebUtc: string;
  startUtc: string;
  stopSellingAtWeb: string;
  stopSellingAtWebUtc: string;
  webInstanceId: string | null;
  // Client-specific attributes
  attributes: CustomAttributes;
}

export interface SpektrixEventTime {
  Attributes: any;
  Capacity: number;
  EventInstanceId: string;
  OnSaleOnWeb: boolean;
  SeatsAvailable: number;
  SeatsLocked: number;
  SeatsReserved: number;
  SeatsSelected: number;
  SeatsSold: number;
  Time: string;
  WebInstanceId: string | null;
}

export interface SpektrixEventXml {
  Event: {
    Attributes: {
      EventAttribute: Array<{ Name: string; Value: string }>;
    };
    Description: string;
    Duration: number;
    FirstInstance: string;
    Html: string;
    Id: string;
    ImageUrl: string;
    LastInstance: string;
    Name: string;
    OnSaleOnWeb: boolean;
    ThumbnailUrl: string;
    Times: {
      EventTime: SpektrixEventTime[];
    };
    WebEventId: string | null;
  };
}

export interface EventAvailability {
  capacity: number;
  available: number;
  locked: number;
  reserved: number;
  selected: number;
  sold: number;
}