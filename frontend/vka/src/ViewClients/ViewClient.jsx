import { useState, useEffect } from 'react';
import Header from '../Home/Header';
import SidePreview from './SidePreview';
import DeleteModal from '../Modals/DeleteModal';
import axios from 'axios';


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import MyCalendar from '../component/MyCalendar';


export default function ViewClient() {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);
  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedClient, setDeletedClient] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios.get(import.meta.env.VITE_API_BASE_URL + "/client", {withCredentials:true})
    .then((response) => setClients(response.data))
  };

  const handleDelete = (client) => {
    setIsModalOpen(true);
    setDeletedClient(client);
  };

  const handleSearch = async (e) => {
    // e.preventDefault();
    // const emri = document.getElementById("simple-search").value;
    // searchByName(emri).then(client =>{
    //   client.sort((a, b) => b.id - a.id);
    //   setClients(client)} 
    //   );
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

  const handleConfirm2 = (client) => {
    setDeletedClient(client);
    setIsModalOpen(false);
    handleClose();
    axios.delete(import.meta.env.VITE_API_BASE_URL + "/client/"+ client.id, {withCredentials:true}).then(()=>fetchClients());
  };


  const clientData = clients.map((client) => ({
    emri : client.first_name,
    modeli : client.modeli_veshjes,
    porosia : client.data_porosise,
    marrja : client.data_marrjes,
    statusi : 
      <button className='bg-blue-600 p-2 rounded-xl'>
        Jo e Paguar
      </button>
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
  
    {/* Delete Button */}
    <button
      type="button"
      data-modal-target="delete-modal"
      data-modal-toggle="delete-modal"
      className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      onClick={() => handleDelete(client)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      Delete
    </button>
  
    {/* Bought Button */}
    <button
      type="button"
      className="flex items-center text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900"
      onClick={() => handleBought(client)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1 5h13.2a1 1 0 001-.78l1.8-8.22M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Bought
    </button>
  </div>
    
  }))

  // yyyy-mm-dd
  const deadlines = ['2025-03-15', '2025-03-18', '2025-03-18', '2025-03-20']

  return (
    <div className="w-full h-screen">
      <Header pos={true}/>
      <div className="flex justify-center items-center mt-12 w-full">
        <div className="w-full px-4 py-8 bg-gray-800 shadow-md sm:rounded-lg">
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
          <div className='flex justify-between m-1 items-start'>
            <div className="p-d-flex p-flex-column p-ai-center p-py-4 w-2/3" >
              <DataTable value={clientData} paginator rows={8} rowHover={true} rowClassName="bg-gray-700 text-white font-bold text-center p-4 hover:bg-gray-600">
                <Column field="emri" header="Emri" sortable  align={"center"} alignHeader={"center"}></Column>
                <Column field="modeli" header="Modeli Veshjes" sortable align={"center"} alignHeader={"center"}></Column>
                <Column field="porosia" header="Data Porosise" align={"center"} alignHeader={"center"}></Column>
                <Column field="marrja" header="Data Marrjes" align={"center"} alignHeader={"center"}></Column>
                <Column field="statusi" header="Statusi" align={"center"} alignHeader={"center"}></Column>
                <Column field="butonat" header="Butonat" align={"center"} alignHeader={"center"}></Column>
              </DataTable>
            </div>

            <MyCalendar deadlines={deadlines}/>
            
          </div>
        </div>
      </div>
      {client != null && <SidePreview show={show} exit={showPreview} client={client} del={handleConfirm2}/>}
      <DeleteModal show={isModalOpen} onConfirm={handleConfirm} onClose={handleClose} client={deletedClient}/>
      
    </div>
  );
}
