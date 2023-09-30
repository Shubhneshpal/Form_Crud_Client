import React from 'react'

export default function Note(props) {
  const delNote = ()=>{
    props.deltclick(props.id);
  }
  return (
    <div className="box">
    <div className='title'>
    <div className="title1">
    <h5 className='h5head'>{props.titles}</h5> 
    <p className='noteprofont'>{props.contents} </p> <br />
    <p className='delete' onClick={delNote}><i className="fa fa-trash" aria-hidden="true"></i></p>
    </div>
      
    </div>

    </div>
  )
}
