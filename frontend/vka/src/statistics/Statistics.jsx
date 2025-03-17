import React from 'react';
import Header from '../Home/Header';
import { Chart } from 'primereact/chart';

export default function Statistics() {
  const chartDataLine = {
    labels: ['Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor', 'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'],
    datasets: [
      {
        label: 'Veshjet e shitura ndër muaj',
        data: [1, 2, 10], // Values for each month
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgb(75, 192, 192)',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  const chartDataBar = {
    labels: ['Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor', 'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor'],
    datasets: [
      {
        label: 'Pagesat ndër muaj',
        data: [1, 2, 10, 5, 200], // Values for each month
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgb(75, 192, 192)',
        tension: 0.4
      }
    ]
  };



  return (
    <div className='bg-gray-800 w-full h-screen'>
      <Header pos={true} />
      <div className='flex w-full justify-around'>
        <div className='w-[250px] h-[180px] lg:w-[400px] bg-blue-300'></div>
        <div className='w-[250px] h-[180px] lg:w-[400px] bg-blue-300'></div>
      </div>
      <div className='flex gap-4 mx-4'>
        <Chart type="line" data={chartDataLine} options={chartOptions} className='w-1/2 bg-white rounded'/>
        <Chart type="bar" data={chartDataBar} options={chartOptions} className='w-1/2 bg-white rounded' width='w-full'/>
      </div>
    </div>
  );
}
