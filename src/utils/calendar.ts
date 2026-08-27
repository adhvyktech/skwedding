import type { WeddingEvent } from '../config/wedding';

export function createGoogleCalendarUrl(event: WeddingEvent): string {
  const formatUtcOrLocal = (iso: string) => {
    const d = new Date(iso);
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const title = encodeURIComponent(`Sarvesh & Keerthana Wedding — ${event.title}`);
  const details = encodeURIComponent(
    `${event.description}\n\nVenue: ${event.venueName}, ${event.venueAddress}\nTime: ${event.timeDisplay}\n\nWe look forward to celebrating with you!`
  );
  const location = encodeURIComponent(`${event.venueName}, ${event.venueAddress}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatUtcOrLocal(
    event.startIso
  )}/${formatUtcOrLocal(event.endIso)}&details=${details}&location=${location}`;
}

export function downloadIcsFile(event: WeddingEvent): void {
  const formatIcsDate = (iso: string) => {
    const d = new Date(iso);
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const start = formatIcsDate(event.startIso);
  const end = formatIcsDate(event.endIso);
  const now = formatIcsDate(new Date().toISOString());

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sarvesh & Keerthana Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:sk-wedding-${event.id}-${Date.now()}@wedding.sarveshkeerthana.com`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:Sarvesh & Keerthana Wedding — ${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')} (Venue: ${event.venueName})`,
    `LOCATION:${event.venueName}, ${event.venueAddress}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: Sarvesh & Keerthana Wedding — ${event.title} is tomorrow!`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `Sarvesh-Keerthana-${event.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
