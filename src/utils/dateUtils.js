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
