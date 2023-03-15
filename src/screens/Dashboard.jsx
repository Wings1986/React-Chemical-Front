import React, {useEffect, useState} from 'react'
import { Button, Table } from 'react-bootstrap'
import '../styles/Dashboard.scss'
import AddChemical from "./AddChemical";
import {CiEdit} from 'react-icons/ci';
import DeleteButton from "../components/DeleteButton";
import {FaWindowClose} from "react-icons/fa";
import EditChemical from "./EditChemical";

const Dashboard = ({chemicals, fetchChemicals, handleChemicalDelete, handleChemicalEdit, addChemical }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [chemicalData, setChemicalData] = useState({
        _id: 0,
        chemicalName: "",
        chemicalQuantity: ""
    })

  if(chemicals && chemicals.length > 0){
    return (
      <div className='flex flex-col md:flex-row justify-start gap-10 py-10 container px-5 md:px-0 md:pr-10 shadow-lg shadow-primary rounded-lg'>
          <div className={`md:w-4/12`}>
              <AddChemical fetchChemicals={fetchChemicals} addChemical={addChemical} />
          </div>
          <div className={`md:w-8/12 md:px-10 overflow-auto`}>
              <h2 className={`text-xl my-10`}>Dashboard</h2>
              <Table className={`w-full`}>
                  <thead>
                  <tr>
                      <th className={`p-`}>Date</th>
                      <th className={`p-1 pb-3`}>Chemical Name</th>
                      <th className={`p-1 pb-3`}>Chemical Quantity</th>
                      <th className={`p-1 pb-3`}>Operations</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                      chemicals.map(({_id, chemicalName, chemicalQuantity, time }, idx) => (
                          <tr key={_id} className={`${idx % 2 && 'bg-gray-200'}`}>
                              <td className={`p-1`}>{time}</td>
                              <td className={`p-1`}>{chemicalName}</td>
                              <td className={`p-1`}>{chemicalQuantity}</td>
                              <td className={`p-1`}>
                                  <div className={`flex gap-4 justify-center`}>
                                      <Button onClick={() => {
                                          setShowEditModal(true);
                                          setChemicalData({
                                              _id,
                                              chemicalName,
                                              chemicalQuantity
                                          })
                                      }} className={`text-blue-900`}>
                                          <CiEdit size={20} />
                                      </Button>
                                      <DeleteButton handleChemicalDelete={handleChemicalDelete} _id={_id} />
                                  </div>
                              </td>
                          </tr>
                      ))
                  }
                  </tbody>
              </Table>
          </div>
          {showEditModal && (
              <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  <div className="fixed inset-0 z-10 overflow-y-auto">
                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                  <div className={`flex justify-end w-full cursor-pointer`} onClick={() => setShowEditModal(false)}>
                                          <FaWindowClose />
                                  </div>
                                  <div>
                                      <EditChemical setShowEditModal={setShowEditModal} chemicalData={chemicalData} setChemicalData={setChemicalData} fetchChemicals={fetchChemicals} />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}
      </div>
    )
  }else{
    return (
        <div className='flex justify-start gap-10 py-10 container'>
            <div className={`w-4/12`}>
                <AddChemical fetchChemicals={fetchChemicals} addChemical={addChemical} />
            </div>
            <div className='w-8/12'>
             <p>No data available </p>
            </div>
        </div>
    )
  }
 
}

export default Dashboard