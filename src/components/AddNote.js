import { useState , useRef , useEffect} from 'react';
import '../css/AddNote.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Modal } from 'bootstrap';


function AddNote({ onAdd , noteToEdit, onEdit , modalRef }) {
    
   const [hasAdded, setHasAdded] = useState(() => {
  const savedNotes = localStorage.getItem("notes");
  return savedNotes ? JSON.parse(savedNotes).length > 0 : false;
});

const [selectedCat, setSelectedCat] = useState(noteToEdit?.cat || "");
const [title, setTitle] = useState(noteToEdit?.title || "");
const [desc, setDesc] = useState(noteToEdit?.desc || "");

useEffect(() => {
  if (noteToEdit) {
    setTitle(noteToEdit.title);
    setDesc(noteToEdit.desc);
    setSelectedCat(noteToEdit.category);
  } else {
    setTitle("");
    setDesc("");
   setSelectedCat(""); // ✅
  }
}, [noteToEdit]);

  // Close modal


  const handleClick = (e) => {
    e.preventDefault();
    const category = e.target.innerText;
    setSelectedCat(category);
  };
 const handleSubmit = (e) => {
  e.preventDefault();

  if (title.length < 3) {
    alert("Title must be at least 3 characters long.");
    return;
  }
  if (desc.length < 5) {
    alert("Description must be at least 5 characters long.");
    return;
  }
  if (selectedCat === "") {
    alert("Please select a category.");
    return;
  }

  const noteData = {
    title,
    desc,
    category: selectedCat,
  };

  if (noteToEdit) {
    onEdit({ ...noteToEdit, ...noteData });
  } else {
    onAdd(title, desc, selectedCat);
    setHasAdded(true);
  }

  const modalInstance = Modal.getOrCreateInstance(modalRef.current);
  modalInstance.hide();

  setTitle("");
  setDesc("");
  setSelectedCat("");
};
        
  return (
    <>
      {/* Modal Trigger Button */}
<div className={hasAdded ? "below-navbar" : "fullscreen-center" }>
  <button
    type="button"
    className="btn main-btn"
 onClick={() => {
    if (modalRef.current) {
      const modalInstance = Modal.getOrCreateInstance(modalRef.current);
      modalInstance.show();
    }
  }}
>
    Add a Todo-list
  </button>
</div>

      <div
        ref={modalRef}
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="false"
        data-bs-keyboard="true"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add a Todo-list
              </h1>

            </div>

            <form className="modal-body" onSubmit={handleSubmit}>
              {/* Title Input */}
              <div className="mb-3" >
                <label htmlFor="my-title" className="form-label">Title</label>
                <input
                    minLength={3}
                  type="text"
                  className="form-control placeholder-white"
                  style={{ backgroundColor: "rgba(83, 83, 83, 1)", color: "white" }}
                  id="my-title"
                   value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                />
              </div>

              {/* Description Input */}
              <div className="mb-3">
                <label htmlFor="my-description" className="form-label">Description List</label>
                <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                minLength={5}
                  className="form-control"
                  id="my-description"
                  style={{ backgroundColor: "rgba(83, 83, 83, 1)", color: "white" }}
                  rows="3"
                ></textarea>

                {/* Dropdown */}
                <div className="dropdown mt-3">
                  <button
                    className="btn btn-secondary dropdown-toggle main-btn-two"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    { selectedCat === "" ? "Select a category" : selectedCat && `Category: ${selectedCat}`}
                  </button>
                  <ul className="dropdown-menu opt-btn" style={{ margin: 0 }}>
                <li><button className="dropdown-item" onClick={handleClick}>Shopping</button></li>
                  <li><button className="dropdown-item" onClick={handleClick}>School</button></li>
                  <li><button className="dropdown-item" onClick={handleClick}>Cooking</button></li>
                  <li><button className="dropdown-item" onClick={handleClick}>Personal</button></li>
                  <li><button className="dropdown-item" onClick={handleClick}>Work</button></li>
                  <li><button className="dropdown-item" onClick={handleClick}>Fitness</button></li>
                  <li><button className="dropdown-item" onClick={handleClick}>Health</button></li>
                  <li><button className="dropdown-item" onClick={handleClick}>Finance</button></li>
                  <li><button className="dropdown-item" onClick={handleClick}>Hobbies</button></li>
                  <li><button className="dropdown-item" onClick={handleClick}>Chores</button></li>
                  <li><button className="dropdown-item" onClick={handleClick}>Other...</button></li>

                  </ul>
                </div>

                {/* Selected Category Display */}
                <p className="mt-2">Selected Category: <strong>{selectedCat}</strong></p>
              </div>

                <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add List</button>
            </div>

            </form>

          
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNote;