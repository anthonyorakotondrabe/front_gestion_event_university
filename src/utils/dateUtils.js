/**
 * Formats a date to a human-readable local string including time.
 * @param {string|Date} date - The date to format.
 * @returns {string} Formatted local date and time.
 */
export const formatToLocalTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Formats a date to a YYYY-MM-DDTHH:mm format in local time.
 * Useful for datetime-local input fields.
 * @param {string|Date} date - The date to format.
 * @returns {string} Formatted local ISO string.
 */
export const formatToLocalISO = (date) => {
  if (!date) return '';
  const d = new Date(date);

  // Adjust for local timezone offset
  const offset = d.getTimezoneOffset() * 60000;
  const localDate = new Date(d.getTime() - offset);

  return localDate.toISOString().slice(0, 16);
};

/**
 * Formats a date to a relative time string (e.g., "il y a 2 heures").
 * @param {string|Date} date - The date to format.
 * @returns {string} Relative time string.
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now - d) / 1000);

  if (diffInSeconds < 0) return formatToLocalTime(date); // Future date

  const rtf = new Intl.RelativeTimeFormat('fr-FR', { numeric: 'auto' });

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return rtf.format(-diffInMinutes, 'minute');
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return rtf.format(-diffInHours, 'hour');
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return rtf.format(-diffInDays, 'day');
  }

  return formatToLocalTime(date);
};
