import React, { useRef, useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListItem from '../ListItem/ListItem';
import "./List.css"; 



const List = ({list}) => {
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const [clickable,setClickable] = useState(true);
    const listRef = useRef();

    const handleClick = async (e, direction) => {
        e.preventDefault();
        //this -70.5 is to account for margin, but its not reactive at all
        //fudge responsiveness I guess
        let distance = listRef.current.getBoundingClientRect().x-70;
        //console.log(listRef.current.children[0].clientWidth);
        console.log(listRef.current);
        setIsMoved(true);
        try{
            if(clickable)
            {
                if(direction === 'left' && slideNumber > 0)
                {
                    setSlideNumber(slideNumber-1);
                    listRef.current.style.transform = `translateX(${distance + listRef.current.children[0].clientWidth*2.5}px) `;
                    //listRef.current.style.transform = `translateX(${distance + 345}px)`;
                    //listRef.current.x
                    console.log(list.content.count);
                }
                if(direction === 'right' && slideNumber < 2)
                {
                    setSlideNumber(slideNumber+1);
                    listRef.current.style.transform = `translateX(${distance - listRef.current.children[0].clientWidth*2.5}px) `;
                    //listRef.current.style.transform = `translateX(20vh)`;
                    //listRef.current.children[0].scrollLeft = 700;
                    console.log(listRef);
                    //console.log(list.content.length);
                    //list.content[slideNumber]
                }
                setClickable(false)
                setTimeout(() => {
                    setClickable(true)
                  }, 1000);
            }
        }catch(err) {
    
        }
    }

  return (


    
    <div className='mt-3 w-100 position-relative listContainer'>
        <h3 className='ms-7 text-white'>{list.title}</h3>
        <div className="position-relative">
            <button type="button" onClick={(e) => handleClick(e, 'left')} className={'btn text-white position-absolute z-2 text-white h-100 w-3 p-0 ' + (isMoved ? 'd-block' : 'd-none')} aria-expanded="false">
                <ArrowBackIosNewIcon className='bg-dark w-100 h-100 bg-opacity-50'/>
            </button>
            <button type="button" onClick={(e) => handleClick(e, 'right')} className="btn text-white position-absolute z-2 text-white h-100 w-3 p-0 end-0" aria-expanded="false">
                <ArrowForwardIosIcon  className='bg-dark bg-opacity-50 text-white w-100 h-100'/>
            </button>
            <div className="d-flex size flex-nowrap ms-7 transitionXY" ref={listRef}>
                {list.content.map((item,i) => (
                    <ListItem index={i} item={item} key={item}/>
                ))}
            </div>
        </div>
    </div>

  )
}

export default List