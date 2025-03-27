import React from 'react';

export default function MonthCalendar({ isVisible, changeVisible, setMonth }) {
  const months = [
    { name: 'Jan', value: 1 },
    { name: 'Shku', value: 2 },
    { name: 'Mar', value: 3 },
    { name: 'Pri', value: 4 },
    { name: 'Maj', value: 5 },
    { name: 'Qer', value: 6 },
    { name: 'Kor', value: 7 },
    { name: 'Gus', value: 8 },
    { name: 'Shta', value: 9 },
    { name: 'Tet', value: 10 },
    { name: 'Nën', value: 11 },
    { name: 'Dhje', value: 12 },
  ];

  const handleMonthSelect = (monthValue) => {
    setMonth(monthValue);
    changeVisible(false);  // Close the modal after selection
  };

  return (
    <>
      {/* Dark overlay that appears when isVisible is true */}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
      )}

      {/* The calendar modal */}
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-20" onClick={() => changeVisible(false)}>
          <div className='bg-[#2a323d] rounded-xl shadow-lg flex flex-col justify-center items-center'>
            <span className='mt-4 text-2xl'>Muajt</span>  
            <div className="grid grid-cols-3 gap-y-5 p-6">
              {months.map(({ name, value }) => (
                <div
                  key={value}
                  className="border-2 border-transparent hover:border-white hover:cursor-pointer p-4 rounded-xl text-center transition-all select-none"
                  onClick={() => handleMonthSelect(value)}
                >
                  {name}
                </div>
              ))}
            </div>
            <button onClick={() => setMonth(null)} className='mb-4 bg-blue-500 p-2 rounded-md'>Clear</button>
          </div>
        </div>
      )}
    </>
  );
}
