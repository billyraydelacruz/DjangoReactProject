import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function EditForm(props){

    const [appointment, setAppointment] = useState(props.currentAppointment);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAppointment({...appointment, [name]: value});
    }

    const editData = async () => {
        const response = await Axios.put(`http://127.0.0.1:8000/api/${appointment.id}/`, appointment)
        .then(props.updateAppointment(appointment))
        .catch((err) => {console.log(err.response);})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editData();
        setAppointment(props.currentAppointment)
        }

        useEffect(() => {
            setAppointment(props.currentAppointment)
        }, [props])

    return (
        
        <form>
            <label>Patient's Name: </label>
            <input type='text' name ='name' value ={appointment.name} onChange ={handleChange}/>
            <label>From: </label>
            <input type='datetime-local' name='start' value ={appointment.start} onChange ={handleChange}/>
            <label>To: </label>
            <input type='datetime-local' name='end'value ={appointment.end} onChange ={handleChange}/>
            <label>Comments: </label>
            <input type='text' name='comments' value ={appointment.comments} onChange ={handleChange}/>
            <button type='submit' onClick={handleSubmit}>Update</button> 
        </form>
    )
} export default EditForm;