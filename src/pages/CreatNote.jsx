import React, { useState } from 'react'

export default function CreatNote(props) {
const [sclick, setSclick] = useState(false);

const [not, setNot] = useState({  
  title:"",
  content:"",
});

const AddEvent = (event)=>{
  const {name,value} = event.target;

  setNot((prevData)=>{
    return {
      ...prevData,
      [name]:value
    };
  });
}
console.log(not)

const AddNote = (event)=>{
  event.preventDefault()
  props.protype(not);
  setNot({
    title:"",
    content:"",
  });
};

const expand = ()=>{
  setSclick(true)
}

const dbclose = ()=>{
  setSclick(false)
}



  return (
    <section id='Google'>
      <div className="container">
      <div className='main-note' onDoubleClick={dbclose}>
    <h1 className='googlekeep'>Google Keep</h1>
    <form action="#" className='forms'>
        {sclick?<input className='inputname' autoFocus value={not.title} name='title' onChange={AddEvent} type="text" placeholder='Add Title' autoComplete='off' />:null}
        <textarea className='textareafont'  value={not.content} name='content' onChange={AddEvent} onClick={expand} id="notes" cols="" rows="" placeholder='Write a note...' autoComplete='off'></textarea>
        {sclick?<button onClick={AddNote} className='btnbtn'><i className="fa fa-plus-circle" aria-hidden="true"></i></button>:null}
    </form>      
    </div>
      </div>
    </section>
  
  )
}
