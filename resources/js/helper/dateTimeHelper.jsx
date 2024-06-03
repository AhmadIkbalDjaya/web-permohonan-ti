export const idFormatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

export const getDateDay = (dateString) => {
    const date = new Date(dateString);
    const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
    ];
    return days[date.getDay()];
};

export const convertToHHMM = (timeString) => {
    let timePart = timeString.split(":");
    return `${timePart[0]}:${timePart[1]}`;
};
