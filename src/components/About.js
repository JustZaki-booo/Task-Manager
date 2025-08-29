import React from 'react'
import '../css/About.css'

function About() {
  return (
    <div className='container'>
        <h1 className='heading'>About TaskManager App</h1>
        <p className='para'>TaskManager is a simple and powerful app designed to help you organize your daily tasks efficiently. With TaskManager, you can:</p>
        <h2 className='heading2'>Features:</h2>
        <ul className='list'>
            <li>Add, Edit, and Delete Tasks – Keep your task list up to date effortlessly.</li>
            <li>Mark Tasks as Complete or Incomplete – Track your progress easily.</li>
            <li>Local Storage Support – All your tasks are saved locally, so you never lose your data.</li>
            <li>Task Categories – Organize your tasks into categories like Work, Study, and Personal.</li>
             <li>Search Tasks – Quickly find tasks using the built-in search functionality.</li>
        </ul>
    </div>
  )
}

export default About;