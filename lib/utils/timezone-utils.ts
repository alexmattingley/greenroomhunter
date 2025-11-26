/**
 * Utility functions for timezone conversion
 */

/**
 * Converts a UTC timestamp string to the user's local timezone
 * @param utcTimestamp - UTC timestamp in ISO format (e.g., "2024-01-15 14:30:00")
 * @returns Formatted timestamp in user's local timezone
 */
export function convertToLocalTimezone(
  utcTimestamp: string | null | undefined
): string {
  if (!utcTimestamp) {
    return "";
  }

  try {
    // Parse the UTC timestamp - handle both ISO format and space-separated format
    let date: Date;
    if (utcTimestamp.includes("T")) {
      // ISO format with T separator
      date = new Date(utcTimestamp);
    } else {
      // Space-separated format (from Python script)
      // Add 'Z' to indicate UTC if not present
      const utcString = utcTimestamp.includes("Z")
        ? utcTimestamp
        : `${utcTimestamp}Z`;
      date = new Date(utcString);
    }

    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn("Invalid timestamp format:", utcTimestamp);
      return utcTimestamp; // Return original if parsing fails
    }

    // Format the date in user's local timezone
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    return date.toLocaleString("en-US", options);
  } catch (error) {
    console.error("Error converting timestamp to local timezone:", error);
    return utcTimestamp; // Return original if conversion fails
  }
}

/**
 * Gets the user's timezone offset in hours
 * @returns Timezone offset in hours (e.g., -8 for PST, -5 for EST)
 */
export function getUserTimezoneOffset(): number {
  return new Date().getTimezoneOffset() / -60;
}

/**
 * Formats a timestamp with a custom format
 * @param utcTimestamp - UTC timestamp
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted timestamp
 */
export function formatTimestamp(
  utcTimestamp: string | null | undefined,
  options: Intl.DateTimeFormatOptions = {}
): string {
  if (!utcTimestamp) {
    return "";
  }

  try {
    let date: Date;
    if (utcTimestamp.includes("T")) {
      date = new Date(utcTimestamp);
    } else {
      const utcString = utcTimestamp.includes("Z")
        ? utcTimestamp
        : `${utcTimestamp}Z`;
      date = new Date(utcString);
    }

    if (isNaN(date.getTime())) {
      return utcTimestamp;
    }

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    };

    return date.toLocaleString("en-US", { ...defaultOptions, ...options });
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return utcTimestamp;
  }
}

/**
 * Checks if a timestamp is more than 2 hours old
 * @param timestamp - Timestamp string to check
 * @returns true if timestamp is more than 2 hours old, false otherwise
 */
export function checkIfStale(timestamp: string | null | undefined): boolean {
  if (!timestamp) return false;
  // IMPORTANT: You need the 'Z' at the end of the timestamp so it compares UTC times.
  const timestampDate = new Date(`${timestamp}Z`);
  const now = new Date();
  const twoHoursInMs = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
  return now.getTime() - timestampDate.getTime() > twoHoursInMs;
}
