import React, { useContext, useEffect, useState } from 'react'
import './productList.scss'
import {DataGrid} from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import {Link} from 'react-router-dom';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { deleteMovie, getMovies } from '../../context/movieContext/apiCalls';

const ProductList = () => {
    const {movies,dispatch} = useContext(MovieContext);

    useEffect(() => {
        getMovies(dispatch)
    },[dispatch])

    const handleDelete = (id) => {
        deleteMovie(id,dispatch);
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'movie', headerName: 'Movie', width: 200, renderCell:(params)=>{
            return(
                <div className='productListItem'>
                    <img className='productListImg' src={params.row.img} alt=""/>
                    {params.row.title}
                </div>
            )
        } },
        { field: 'genre', headerName: 'Genre', width: 120 },
        { field: 'year', headerName: 'year', width: 120 },
        { field: 'agelimit', headerName: 'limit', width: 120 },
        { field: 'isseries', headerName: 'isSeries', width: 120 },
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
                    <Link to={{pathname:'/product/'+params.row.id}} state={params.row}>
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
        <DataGrid rows={movies} disableRowSelectionOnClick columns={columns} initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]} checkboxSelection />
    </div>
  )
}

export default ProductList