import { useState, useEffect } from 'react';
import Header from '../Home/Header';
import SidePreview from './SidePreview';
import DeleteModal from '../Modals/DeleteModal';
import axios from 'axios';


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import MyCalendar from '../component/MyCalendar';
import { Calendar } from 'primereact/calendar';
import MonthCalendar from '../component/MonthCalendar';


export default function ViewClient() {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);
  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedClient, setDeletedClient] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(null);
  const deadlines = [];

  const [monthCalendarVisible,setMonthCalendarVisible] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios.get(import.meta.env.VITE_API_BASE_URL + "/client", {withCredentials:true})
    .then((response) => {setClients(response.data)})
  };

  const handleDelete = (client) => {
    setIsModalOpen(true);
    setDeletedClient(client);
  };

  //Kur klienti kryen pagesen me u ndryshu statusi dhe update
  const handleBought = (client) => {
    client.paguar = true;
    setClient({...client, paguar: true});
    axios.put(import.meta.env.VITE_API_BASE_URL + "/client/"+client.id,client, {withCredentials:true}).then(()=>fetchClients());
  }

  const handleSearch = async (e) => {
    // e.preventDefault();
  }

  const showPreview = (client) => {
    setShow(show => !show);
    setClient(client)
    fetchClients();
  }
  
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    handleClose();
    axios.delete(import.meta.env.VITE_API_BASE_URL + "/client/"+deletedClient.id, {withCredentials:true}).then(()=>fetchClients());
  };

  // Confrim butoni ne sideview
  const handleConfirm2 = (client) => {
    setDeletedClient(client);
    setIsModalOpen(false);
    handleClose();
    axios.delete(import.meta.env.VITE_API_BASE_URL + "/client/"+ client.id, {withCredentials:true}).then(()=>fetchClients());
  };

  const handleCurrentMonth = (num) => {
    setCurrentMonth(num);

  }



  // Rregullon formatin default te dates ne yyyy-mm-dd 
  // Nevojitet ky format per kalendar dhe si shkurtese ne tabele.
  const fixDataFormat = (date) => {
    let formatedDate = date;
    if (date){
      formatedDate = date.split("T")[0];
      deadlines.push(formatedDate);
    }
    return formatedDate;
  }


  const clientData = clients.map((client) => ({
    emri : client.first_name + " " + client.last_name,
    porosia : client.data_porosise != null ? client.data_porosise.split("T")[0]:"",
    marrja : fixDataFormat(client.data_marrjes),
    statusi :
      client.paguar ? 
      (
        <div className={'bg-green-600 p-2 rounded-xl'}>
          Paguar
        </div>
      ):
      (<div className={'bg-blue-600 p-2 rounded-xl'}>
        Jo e Paguar
      </div>) 
    ,
    butonat : 
    <div className="flex items-center space-x-4 justify-center">
    {/* View Button */}
    <button
      type="button"
      data-drawer-target="drawer-read-product-advanced"
      data-drawer-show="drawer-read-product-advanced"
      aria-controls="drawer-read-product-advanced"
      className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      onClick={() => showPreview(client)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2 -ml-0.5">
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" />
      </svg>
      Shiko
    </button>
  
  
    {/* Bought Button */}
    <button
      type="button"
      className={`flex items-center text-green-700  border border-green-700 
        ${client.paguar ? 'opacity-50 cursor-not-allowed' : 'hover:text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300'}
        font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-green-500 
        dark:text-green-500 dark:focus:ring-green-900`}
      onClick={() => handleBought(client)}
      disabled={client.paguar}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1 5h13.2a1 1 0 001-.78l1.8-8.22M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Paguaj
    </button>

  </div>
    
  }))

  const filteredClinets = clientData.filter((client) => {
    return currentMonth!= null ? client.marrja.split("-")[1] == currentMonth : true;
  })

  return (
    <div className="w-full h-screen">
      <Header pos={true}/>
      <div className="flex justify-center items-center mt-12 w-full">
        <div className="w-full px-4 py-8 bg-gray-800 shadow-md sm:rounded-lg">
        {/* Trash can SVG */}
        <svg className='float-right cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"  viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
          <h2 className="text-2xl font-semibold text-gray-200 mb-4 text-center">KLIENTËT</h2>
          <div className="w-full md:w-1/2">
            <form className="flex items-center" onSubmit={handleSearch}>
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  placeholder="Kërko emrin e klientit"
                  required=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </form>
          </div>
          <br />
          <div className='flex justify-between m-1 items-start flex-wrap'>
            <div className="p-d-flex p-flex-column p-ai-center p-py-4 md:w-2/3 w-full" >
              <DataTable value={filteredClinets} paginator rows={10} rowHover={true} rowClassName="bg-gray-700 text-white font-bold text-center hover:bg-gray-600">
                <Column field="emri" header="Emri" sortable  align={"center"} alignHeader={"center"}></Column>
                {/* <Column field="modeli" header="Modeli Veshjes" sortable align={"center"} alignHeader={"center"}></Column> */}
                <Column field="porosia" header="Data Porosise" align={"center"} alignHeader={"center"}></Column>
                <Column field="marrja" header={
                  <div className='cursor-pointer flex justify-center align-middle gap-1' onClick={() => setMonthCalendarVisible(true)}>
                    Data e Marrjes
                    <svg width={20} fill='white' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M113.854 22.323h-9.667v-2.677a7.25 7.25 0 0 0-14.5 0v2.677H38.313v-2.677a7.25 7.25 0 0 0-14.5 0v2.677h-9.667a1.75 1.75 0 0 0-1.75 1.75v89.781a1.751 1.751 0 0 0 1.75 1.75h99.708a1.751 1.751 0 0 0 1.75-1.75V24.073a1.75 1.75 0 0 0-1.75-1.75zm-20.667-2.677a3.75 3.75 0 0 1 7.5 0V28.5a3.75 3.75 0 0 1-7.5 0zm-65.874 0a3.75 3.75 0 0 1 7.5 0V28.5a3.75 3.75 0 0 1-7.5 0zm-3.5 6.177V28.5a7.25 7.25 0 0 0 14.5 0v-2.677h51.374V28.5a7.25 7.25 0 0 0 14.5 0v-2.677h7.913V44.2H15.9V25.823zM15.9 112.1V47.7h96.2v64.4z"/><path d="M40.2 56h-8.721a1.749 1.749 0 0 0-1.75 1.75v8.719a1.749 1.749 0 0 0 1.75 1.75H40.2a1.749 1.749 0 0 0 1.75-1.75V57.75A1.749 1.749 0 0 0 40.2 56zm-1.75 8.719h-5.221V59.5h5.218zM58.972 56h-8.719a1.75 1.75 0 0 0-1.75 1.75v8.719a1.75 1.75 0 0 0 1.75 1.75h8.719a1.75 1.75 0 0 0 1.75-1.75V57.75a1.75 1.75 0 0 0-1.75-1.75zm-1.75 8.719H52V59.5h5.219zM77.747 56h-8.719a1.75 1.75 0 0 0-1.75 1.75v8.719a1.75 1.75 0 0 0 1.75 1.75h8.719a1.749 1.749 0 0 0 1.75-1.75V57.75a1.749 1.749 0 0 0-1.75-1.75zM76 64.719h-5.222V59.5H76zM96.521 56H87.8a1.749 1.749 0 0 0-1.75 1.75v8.719a1.749 1.749 0 0 0 1.75 1.75h8.718a1.749 1.749 0 0 0 1.75-1.75V57.75A1.749 1.749 0 0 0 96.521 56zm-1.75 8.719h-5.218V59.5h5.218zM40.2 74h-8.721a1.749 1.749 0 0 0-1.75 1.75v8.719a1.749 1.749 0 0 0 1.75 1.75H40.2a1.749 1.749 0 0 0 1.75-1.75V75.75A1.749 1.749 0 0 0 40.2 74zm-1.75 8.719h-5.221V77.5h5.218zM58.972 74h-8.719a1.75 1.75 0 0 0-1.75 1.75v8.719a1.75 1.75 0 0 0 1.75 1.75h8.719a1.75 1.75 0 0 0 1.75-1.75V75.75a1.75 1.75 0 0 0-1.75-1.75zm-1.75 8.719H52V77.5h5.219zM77.747 74h-8.719a1.75 1.75 0 0 0-1.75 1.75v8.719a1.75 1.75 0 0 0 1.75 1.75h8.719a1.749 1.749 0 0 0 1.75-1.75V75.75a1.749 1.749 0 0 0-1.75-1.75zM76 82.719h-5.222V77.5H76zM96.521 74H87.8a1.749 1.749 0 0 0-1.75 1.75v8.719a1.749 1.749 0 0 0 1.75 1.75h8.718a1.749 1.749 0 0 0 1.75-1.75V75.75A1.749 1.749 0 0 0 96.521 74zm-1.75 8.719h-5.218V77.5h5.218zM40.2 92h-8.721a1.749 1.749 0 0 0-1.75 1.75v8.719a1.749 1.749 0 0 0 1.75 1.75H40.2a1.749 1.749 0 0 0 1.75-1.75V93.75A1.749 1.749 0 0 0 40.2 92zm-1.75 8.719h-5.221V95.5h5.218zM58.972 92h-8.719a1.75 1.75 0 0 0-1.75 1.75v8.719a1.75 1.75 0 0 0 1.75 1.75h8.719a1.75 1.75 0 0 0 1.75-1.75V93.75a1.75 1.75 0 0 0-1.75-1.75zm-1.75 8.719H52V95.5h5.219zM77.747 92h-8.719a1.75 1.75 0 0 0-1.75 1.75v8.719a1.75 1.75 0 0 0 1.75 1.75h8.719a1.749 1.749 0 0 0 1.75-1.75V93.75a1.749 1.749 0 0 0-1.75-1.75zM76 100.719h-5.222V95.5H76zM96.521 92H87.8a1.749 1.749 0 0 0-1.75 1.75v8.719a1.749 1.749 0 0 0 1.75 1.75h8.718a1.749 1.749 0 0 0 1.75-1.75V93.75A1.749 1.749 0 0 0 96.521 92zm-1.75 8.719h-5.218V95.5h5.218z"/></svg>                    
                  </div>
                } align={"center"} alignHeader={"center"}></Column>
                <Column field="statusi" header="Statusi" align={"center"} alignHeader={"center"}></Column>
                <Column field="butonat" header="Butonat" align={"center"} alignHeader={"center"}></Column>
              </DataTable>
            </div>

            <MyCalendar deadlines={deadlines}/>

            <MonthCalendar isVisible={monthCalendarVisible} setMonth={handleCurrentMonth} changeVisible={setMonthCalendarVisible}/>
            
            
          </div>
        </div>
      </div>
      {client != null && <SidePreview show={show} exit={showPreview} client={client} del={handleConfirm2}/>}
      <DeleteModal show={isModalOpen} onConfirm={handleConfirm} onClose={handleClose} client={deletedClient}/>
      
    </div>
  );
}
