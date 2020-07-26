import React, { useState, useEffect} from 'react'
import Axios from 'axios'
import Moment from 'moment'
import AppointmentTable from './components/AppointmentTable'
import AddForm from './components/AddForm'
import EditForm from './components/EditForm'
import './App.css'

function App(){

  const [appointments, setAppointments] = useState([]);

  // GET method

  const fetchData = async () =>  {
    const result = await Axios("http://127.0.0.1:8000/api/");
    setAppointments(result.data);
    setfilteredAppointment(result.data);
  }

  // Used to fetch data from API server
  
  useEffect( () => {
    fetchData();
  }, []);

  const addAppointment = (appointment) => {
    setAppointments([...appointments, appointment])
  }

  const deleteAppointment = async (id) => {
    const response = await Axios.delete(`http://127.0.0.1:8000/api/${id}`).catch((err) => (console.log(err)))
    if(response) fetchData()
  }
  
  const initAppointment = {
    name:'',
    start:Moment().format(),
    end:Moment().format(),
    comments:''
  }

  // Used to determine what item we are currently editing

  const [currentAppointment, setCurrentAppointment] = useState([initAppointment])

  const editAppointment = (appointment) => {
    setCurrentAppointment(appointment);
  }

  const updateAppointment =(newAppointment) => {
    setAppointments(appointments.map(appointment => (appointment.id === currentAppointment.id ? newAppointment : appointment)));
    setCurrentAppointment(initAppointment)
  }

  const [filterParms, setFilterParms] = useState([])

  // Used to add/subtract a day from the date range provided by the user
  // To include the appointments on the both edge of date range

  const handleChange = (e) => {    
    const {name, value} = e.target
    let newValue = value
    if(name === 'fromDate'){
      newValue = Moment(value).add(-1, 'days').format();
    } else{
      newValue = Moment(value).add(1, 'days').format();
    } 
    setFilterParms({...filterParms, [name]:newValue})

  }

  const [filteredAppointment, setfilteredAppointment] = useState([])

  // Used to filter the appointments according to the date range provided
   
  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredData = appointments.filter(appointments => {
      return appointments.start > filterParms.fromDate && appointments.end < filterParms.toDate});
    setfilteredAppointment(filteredData)
  }

  return (
    <div className='container'>
      <h1>Appointments Manager</h1>
      <div className = 'row'>
        <div className = 'changeAppointment'>
            <div className ='updateAppointment'>
              <h2>Update Appointment</h2>
              <EditForm currentAppointment ={currentAppointment} updateAppointment={updateAppointment} initAppointment={initAppointment}/>
            </div>
            <div className='addAppointment'>
              <h2>Add Appointments</h2>
              <AddForm addAppointment={addAppointment}/>
            </div>
        </div>
        <div className="appointmentList">
        <h2>Appointment List</h2>
          <form>
            <h3>Filter by Date</h3>
            <input type='date' name='fromDate' onChange={handleChange}></input>
            <input type='date' name='toDate' onChange={handleChange}></input>
            <button type='submit' onClick={handleSubmit}>Filter</button>
          </form>
          <AppointmentTable 
            key={appointments.id} 
            appointments={appointments} 
            filteredAppointment ={filteredAppointment} 
            deleteAppointment={deleteAppointment} 
            editAppointment={editAppointment}/>
        </div>
      </div>
    </div>
  )
}

export default App