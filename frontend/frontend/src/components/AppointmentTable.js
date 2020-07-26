import React from 'react'
import Moment from 'moment'

function AppointmentTable(props){

    return(
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Comments</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { props.filteredAppointment.length > 0 ? (
                    props.filteredAppointment.map(appointment => {
                        const {id, name, start, end, comments } = appointment;
                        return (
                        <tr>
                            <td>{name}</td>
                            <td>{Moment(start).format('MMMM Do YYYY, hh:mm a')}</td>
                            <td>{Moment(end).format('MMMM Do YYYY, hh:mm a')}</td>
                            <td>{comments}</td>
                            <td>
                                <button onClick={() => props.deleteAppointment(id)}>Delete</button>
                                <button onClick={() => props.editAppointment(appointment)}>Edit</button>
                            </td>
                        </tr>
                    )})
                ) : <tr>
                    <td colSpan={4}>No Appointments found</td>
                </tr>
                }
            </tbody>
        </table>
    )
}

export default AppointmentTable
