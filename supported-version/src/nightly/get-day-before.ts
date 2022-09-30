/**
 * Gets the date one day before the date.
 */
export const getDayBefore = (date: Date = new Date()) => {
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
}