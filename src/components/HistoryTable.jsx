import React from 'react'
import SingleRecord from '../components/SingleRecord'
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

const HistoryTable = ({sourceContent,setHistory,history,index,setAlertMessage}) => {

  if (!sourceContent || sourceContent.length === 0) return null;
  
  return (
    <table className='w-full mt-3 modern-table' >
              <thead>
                <tr className='text-white flex justify-around w-full font-josefin text-lg'>
                  {/* <th>UserId</th> */}
                  <th>Amount</th>
                  <th>Source</th>
                  <th>Description</th>
                  <th>Time</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  sourceContent &&
                  sourceContent.map((current)=>{
                    return <SingleRecord 
                                key={nanoid()}  
                                id={current.$id} 
                                userId={current.user_id} 
                                amount={current.added_amount} 
                                source={current.source} 
                                description={current.description} 
                                time={current.updated_on}
                                index={index}
                                setAlertMessage={setAlertMessage}
                                history={history}
                                setHistory={setHistory}
                                />
                  })
                } 
              </tbody>
            </table>
  )
}

export default HistoryTable
