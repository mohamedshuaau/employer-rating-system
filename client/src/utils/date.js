/**
 * Date Formatter
 *
 * @param date
 * @returns {string}
 */
export const formatDate = (date, monthOnly = false) => {
    const new_date = new Date(date);
    let options = {year: 'numeric', month: 'long', day: 'numeric'};

    if (monthOnly) {
        options = {month: 'long'};
    }

    const formattedDate = new_date.toLocaleDateString('en-US', options);

    const day = new_date.getDate();
    const daySuffix = getDaySuffix(day);

    return formattedDate.replace(day.toString(), `${day}${daySuffix}`);
};

const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
};
