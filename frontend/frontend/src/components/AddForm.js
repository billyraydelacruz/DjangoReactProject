import React, { useState } from 'react';
import Axios from 'axios';
import Moment from 'moment'

function AddForm(props){
    
    const initAppointment = {
        name:'',
        start:Moment().format(),
        end:Moment().format(),
        comment:''
    }
    const [appointment, setAppointment] = useState(initAppointment);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAppointment({...appointment, [name]: value});
    }
    const submitData = async () => {
        const response = await Axios.post('http://127.0.0.1:8000/api/', appointment)
        .then(props.addAppointment(appointment))
        .catch((err) => {console.log(err.response);})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submitData();
        setAppointment(initAppointment)
        }

    return(
        <form>
            <label>Patient's Name</label>
            <input type='text' name ='name' value ={appointment.name} onChange ={handleChange}/>
            <label>From</label>
            <input type='datetime-local' name='start' value ={appointment.start} onChange ={handleChange}/>
            <label>To</label>
            <input type='datetime-local' name='end'value ={appointment.end} onChange ={handleChange}/>
            <label>Comments</label>
            <input type='text' name='comments' value ={appointment.comments} onChange ={handleChange}/>
            <button type='submit' onClick={handleSubmit} >Add</button> 
        </form>
    )
}

export default AddForm;