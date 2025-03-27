import { Calendar } from "primereact/calendar";

const MyCalendar = ({ deadlines = [] }) => {
  // Count occurrences of each date
  const dateFrequency = deadlines.reduce((acc, date) => {
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Store repeated (red) and unique (blue) dates
  const redDays = new Set(Object.keys(dateFrequency).filter((date) => dateFrequency[date] > 1));
  const blueDays = new Set(Object.keys(dateFrequency).filter((date) => dateFrequency[date] === 1));

  const customDateTemplate = (date) => {
    // Fix date formatting issue (No timezone shift)
    const formattedDate = new Date(date.year, date.month, date.day).toLocaleDateString("sv-SE");

    // Determine color based on occurrences
    const isRed = redDays.has(formattedDate);
    const isBlue = blueDays.has(formattedDate);

    return (
      <div
        className={`p-2 w-full h-full flex items-center justify-center ${
          isRed ? "bg-red-500 text-white font-bold rounded-full" :
          isBlue ? "bg-blue-500 text-white font-bold rounded-full" : ""
        }`}
        
      >
        {date.day}
      </div>
    );
  };

  return (
    <Calendar
      inline
      dateFormat="dd/mm/yy"
      dateTemplate={customDateTemplate}
    />
  );
};

export default MyCalendar;
