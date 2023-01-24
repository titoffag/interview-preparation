type EventId = Date;

// binary search tree - O(log n)
type IntervalTree<T> = unknown;

type CalendarDataStore = {
  eventsMap: Map<EventId, CalendarEvent>,
  events: IntervalTree<EventId>,
  clientState: CalendarClientState,
};

type UserInfo = {};
type RichText = string;
type CalendarEventId = string;

type LinkedList<T> = unknown;

type CalendarEvent = {
  id: CalendarEventId,
  participants: UserInfo[],
  // easily convert and adapt to timezone
  startTimestamp: number,
  endTimestamp: number,
  title: string,
  description: RichText,
  conflictingEvents: LinkedList<CalendarEventId>,
};

/**
  * theme
  * timezone
  * language
*/
type CalendarConfig = unknown;

type CalendarClientState = {
  mode: 'year' | 'month' | 'day',
  configuration: CalendarConfig,
}