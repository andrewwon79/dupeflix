import React, { useContext, useEffect, useState } from 'react'
import './listList.scss'
import {DataGrid} from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import {Link} from 'react-router-dom';
import { ListContext } from '../../context/listContext/ListContext';
import { deleteList, getLists } from '../../context/listContext/apiCalls';

const ListList = () => {
    const {lists,dispatch} = useContext(ListContext);

    useEffect(() => {
        getLists(dispatch)
    },[dispatch])

    const handleDelete = (id) => {
        deleteList(id,dispatch);
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'genre', headerName: 'Genre', width: 250 },
        { field: 'title', headerName: 'title', width: 150 },
        { field: 'type', headerName: 'type', width: 150 },
        {
            field:'action',
            headerName:'Action',
            width:150,
            renderCell: (params)=> {
                return(
                    <>
                    {/* This Link to is equivalent to what we have in Watch with navigate
                        ," navigate(`/watch`,{state:{movie}}); " pass in path that we go to, then some prop, in this case our movie we are editing
                    */}
                    <Link to={{pathname:'/list/'+params.row.id}} state={params.row}>
                        <button className="productListEdit">Edit</button>
                    </Link>
                    <DeleteOutline className='productListDelete' onClick={()=>handleDelete(params.row.id)}/>
                    </>
                )
            }
        }
        
      ];
  return (
    <div className='productList'>
        <DataGrid rows={lists} disableRowSelectionOnClick columns={columns} initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]} checkboxSelection />
    </div>
  )
}

export default ListList