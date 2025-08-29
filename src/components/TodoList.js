import AddNote from "./AddNote";
import { useState, useEffect , useRef } from "react";
import Noteitem from "./Noteitem";

function TodoList({searchTerm}) {
  // ✅ Load notes safely from localStorage
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem("notes");
      const parsed = savedNotes ? JSON.parse(savedNotes) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // ✅ Save notes safely to localStorage whenever notes change
  useEffect(() => {
    if (Array.isArray(notes)) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  // Add a new note
  const onAdd = (title, desc, category) => {
    const newNote = {
      title,
      desc,
      category,
      id: Date.now(),
      completed: false,
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
  };

  // Toggle completed status
  const onToggle = (id) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  // Delete a note
  const onDelete = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    console.log("I am deleting", id);
  };


const filteredNotes = notes.filter(note =>
  note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  note.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
  note.category.toLowerCase().includes(searchTerm.toLowerCase())
);

const activeNotes = filteredNotes.filter(note => !note.completed);
const completedNotes = filteredNotes.filter(note => note.completed);

const [noteToEdit, setNoteToEdit] = useState(null);

const modalRef = useRef(null);

const handleEdit = (note) => {
  setNoteToEdit(note);
  if (modalRef.current) {
    const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalRef.current);
    modalInstance.show();
  }
  
};

const handleUpdate = (updatedNote) => {
  setNotes(prevNotes =>
    prevNotes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    )
  );
};

  return (
    <div>
     <AddNote
  onAdd={onAdd}
  onEdit={handleUpdate}
  noteToEdit={noteToEdit}
  modalRef={modalRef}
/>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
        {Array.isArray(notes) && activeNotes.map(note => (
          <Noteitem
            key={note.id}
            notes={note}
            onDelete={onDelete}
            onToggle={onToggle}
            handleEdit={handleEdit}
          />
        ))}
      </div>

      <div className="completed ">
      <h2 className="mx-3">Completed Tasks</h2>
      <hr/>

      {Array.isArray(notes) && completedNotes.filter(note => note.completed).length === 0 && (
        <h4 className="mx-3">No completed tasks found.</h4>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
      {Array.isArray(notes) && completedNotes.filter(note => note.completed).map(note => (
        <Noteitem
          key={note.id}
          notes={note}
          onDelete={onDelete}
          onToggle={onToggle}
          handleEdit={handleEdit}
        />
      ))}



      </div>
      

      </div>
    </div>
  );
}

export default TodoList;
