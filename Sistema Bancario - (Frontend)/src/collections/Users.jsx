import React from 'react'

export const Users = ({ _id, name, surname, DPI, phone, email, balance, role })=>{ //PROPS -> parámetros que se envían al mmomento de llamar el componente (la función)
    return (
        <>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{DPI}</td>
            <td>{phone}</td>
            <td>{email}</td>
            <td>Q{balance}.00</td>
            <td>{role}</td>
            
        </>
    )
}
