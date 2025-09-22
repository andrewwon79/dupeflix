import React, { useEffect, useMemo, useState } from 'react'
import './home.scss';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import Charts from '../../components/charts/Charts';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import NetflixBaseURL from '../../../src/apis/NetflixBaseURL';

const Home = () => {
  const MONTHS = useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],[]);
const [userStats,setUserStats] = useState([]);

useEffect(()=> {
  const getStats = async () => {
    try{
      const res = await NetflixBaseURL.get("/users/stats", {
        headers: {
          token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
        }
    });
      const statsList = res.data.sort(function (a,b){
        return a.extract - b.extract;
      });
      //console.log(statsList);
      statsList.map((item)=>setUserStats((prev)=>[...prev,{name:MONTHS[item.extract-1], "New User": item.count}]));
    }catch(err)
    {
      console.log(err);
    }
  };
  getStats();
}, [MONTHS]);
  return (
    <div className='home'>
      <FeaturedInfo/>
      <Charts data={userStats} dataKey='New User' grid title='User Analytics' />
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  )
}

export default Home