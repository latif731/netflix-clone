import React from 'react'
import { FaCloudDownloadAlt, FaEdit } from 'react-icons/fa'
import { GoEye } from 'react-icons/go'
import {MdDelete} from "react-icons/md"
import { Link } from 'react-router-dom'
import pp from "../images/5.jpg"
import { DateFormat, shortUppercaseId } from './notification/Empty'

const Head = "text-xs text-left text-main font-semiBold px-6 py-2 uppercase"
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3"
const Haction = "text-xs text-right text-main font-semiBold px-6 py-2 uppercase"
const Rows = ({data, i, users, OnEditFunction, onDeleteFunction}) => {
    // console.log("table2", data)
    // const Text ="text-sm text-left leading-6 whitespace-nowrap px-5 py-3"; 
    return (
        <tr key={i}>
            {users ? 
            (
                // users
                <>
            <td className={`${Text}`}>
                <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
                <img src={data.image ? data.image : `${pp}`} className='h-full w-full object-cover' alt={data.fullName}/> 
                </div>
            </td>
            <td className={`${Text} truncate`}>{data.id ? shortUppercaseId(data._id) : "2R75T8"}</td>
            <td className={`${Text}`}>
                {/* {data.createAt ? data.createAt : "12, Jan 2023"} */}
                {DateFormat(data?.createdAt)}
            </td>
            <td className={`${Text}`}>{data.fullName}</td>
            <td className={`${Text}`}>{data.email}</td>
            <td className={`${Text}`}>{data.isAdmin ? "Admin" : "User" }</td>
            <td className={`${Text} float-right flex-rows gap-2`}>
                {
                    !data.isAdmin && (
            <button
            onClick={() =>  onDeleteFunction(data?._id)}
            className='bg-subMain text-white rounded flex-colo w-7 h-7'>
             <MdDelete/>
              </button>
                    )
                }
            </td>
                </>
            )
            : 
            (
                // category
                <>
                      <td className={`${Text} font-bold`}>{data.id ? shortUppercaseId(data._id) : "2R75T8"}</td>
            <td className={`${Text}`}>{DateFormat(data?.createdAt)}</td>
            <td className={`${Text}`}>{data.title}</td>
            {/* <td className={`${Text}`}>{data.email}</td> */}
            <td className={`${Text} float-right flex-rows gap-2`}>
              <button onClick={() => OnEditFunction(data)}  className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2'>
                Edit <FaEdit className='text-green-500'/>
              </button>
            <button onClick={() => onDeleteFunction(data?._id)} className='bg-subMain text-white rounded flex-colo w-7 h-7'>
             <MdDelete/>
              </button>
            </td>
                </>
            )
            }
        </tr>
    )
}



const Table2 = ({data, users, OnEditFunction, onDeleteFunction}) => {
 
  return (
    <div className='overflow-y-scroll overflow-x-scroll  overflow-hidden relative w-full h-96'>
        <table className='w-full table-auto border border-border divide-y divide-border'>
            <thead className='sticky top-0'>
                <tr className='bg-dryGray'>
                    {
                        users ? 
                        (
                            <>
                            <th scope="col" className={`${Head}`}>Image</th>
                            <th scope="col" className={`${Head}`}>Id</th>
                            <th scope="col" className={`${Head}`}>Date</th>
                            <th scope="col" className={`${Head}`}>Name</th>
                            <th scope="col" className={`${Head}`}>Email</th>
                            <th scope="col" className={`${Head}`}>Role</th>
                            <th scope="col" className={`${Haction}`}>Actions</th>
                            </>
                        ) 
                        : 
                        (
                            <>
                            <th scope="col" className={`${Head}`}>Id</th>
                            <th scope="col" className={`${Head}`}>Date</th>
                            <th scope="col" className={`${Head}`}>Title</th>
                            <th scope="col" className={`${Haction}`}>Actions</th>
                            </>
                        )
                    }
                    {/* <th scope="col" className={`${Head}`}>Hours</th>
                    <th scope="col" className={`${Haction}`}>Actions</th> */}
                </tr>
            </thead>
            <tbody className='bg-main divide-y divide-gray-800'>
                {
                    data.map((data, i) => 
                        <Rows 
                        key={i} 
                        data={data} 
                        users={users} 
                        OnEditFunction={OnEditFunction} 
                        onDeleteFunction={onDeleteFunction}/>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table2