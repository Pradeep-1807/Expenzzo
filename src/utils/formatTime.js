import { DiscFull } from "@mui/icons-material";

const formatTime = (x) => {
    if (!x) {
        return 'No date available'; // Or any other placeholder you prefer
    }

    const timestamp = new Date(x);
    
    if (isNaN(timestamp.getTime())) {
        console.error('Invalid timestamp:', x);
        return 'Invalid date'; // Or any other placeholder you prefer
    }

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata',
        hour12: false
    };
    
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const formattedDate = formatter.format(timestamp);

    const match = formattedDate.match(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2})/);

    if (!match) {
        console.error('Date format mismatch:', formattedDate);
        return 'Invalid date';
    }

    const [day, month, year, hour, minute] = match.slice(1);
    return `${day}-${month}-${year} ${hour}:${minute}`;
};

export default formatTime