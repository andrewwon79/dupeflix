 import React, { useEffect, useState } from 'react'
 import './widgetSm.scss'
 import { Visibility } from '@mui/icons-material';
import NetflixBaseURL from '../../apis/NetflixBaseURL';

 const WidgetSm = () => {
    const [newUsers,setNewUsers] = useState([]);

    useEffect(() => {
        const getNewUsers = async ()=>{
            try{
                const res = await NetflixBaseURL.get('/users?new=true', {
                    headers: {
                        token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
                      }
                });
                setNewUsers(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getNewUsers();
    },[]);
   return (
     <div className='widgetSm'>
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
            {newUsers.map(user=>{
                return (
                    <li className="widgetSmListItem" key={user.username}>
                        <img src={user.profilePic || "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"} alt="" className="widgetSmImg" />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{user.username}</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className='widgetSmIcon'/>
                            Display
                        </button>
                    </li>
                )
            })}
        </ul>
     </div>
   )
 }
 
 export default WidgetSm