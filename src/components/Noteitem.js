import '../css/Noteitem.css';
import { use, useEffect} from 'react';

function Noteitem(props) {
  

  const handleDelete = () => {
    props.onDelete(props.notes.id);
  }
   
useEffect(() => {
  if(props.notes.completed) {
    const check = document.getElementById(`check-${props.notes.id}`);
    check.checked = true;
   const cardBody = check.closest(".card-body");
   const title = cardBody.querySelector(".card-title");
   const desc = cardBody.querySelector(".desc");
    desc.style.textDecoration = "line-through";
    desc.style.opacity = "0.6";
    desc.style.transition = "all 0.3s ease-in-out";

      title.style.textDecoration = "line-through";
    title.style.opacity = "0.6";
    title.style.transition = "all 0.3s ease-in-out";
  } else {
    const check = document.getElementById(`check-${props.notes.id}`);
    check.checked = false;
   const cardBody = check.closest(".card-body");
   const title = cardBody.querySelector(".card-title");
   const desc = cardBody.querySelector(".desc");
    desc.style.textDecoration = "none";
    desc.style.opacity = "1";
    desc.style.transition = "all 0.3s ease-in-out";

      title.style.textDecoration = "none";
    title.style.opacity = "1";
    title.style.transition = "all 0.3s ease-in-out";
  }
}, [ props.notes.completed]);

  const handelClick = () => {
    props.onToggle(props.notes.id);
  }
  
  return (
    <div className="my-3 mx-5 ">
        <div className="card" style={{width: "18rem"}}>
  <div className="card-body">
   <div className="container">

    <h5 className="card-title title">{props.notes.title}</h5>
       <span className="badge rounded-pill text-bg-info info">{props.notes.category}</span>
       
   
    
    <div className="container-two">


      <div className="form-check ">
  <input className="form-check-input check" onClick={handelClick} type="checkbox" value="" id={`check-${props.notes.id}`}/>
  <label className="form-check-label " htmlFor={`check-${props.notes.id}`}>
  </label>
</div>

    <p className="card-text desc">{props.notes.desc}</p>
     </div> 
 
     </div>

    </div>



<div className="icon-container">
      <i onClick={handleDelete} className="fa-solid fa-trash icon"></i>
    <i onClick={() => {props.handleEdit(props.notes)}} className="fa-solid fa-pen-to-square icon"></i>
  </div>


  
    </div>
    </div>
  )
}

export default Noteitem;