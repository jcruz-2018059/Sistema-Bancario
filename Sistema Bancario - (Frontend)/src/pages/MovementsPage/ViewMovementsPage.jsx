import Select from 'react-select';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Users } from '../../collections/Users';

export const ViewMovementsPage = () => {
    const token = localStorage.getItem('token');
    const [user, setUsers] = useState([{}])
    const [sort, setSort] = useState('desc');
    const handleSortChange = (selectedOption) => {
        const newSort = selectedOption.value;
        setSort(newSort);
      };
    const config = {
        headers: {
            Authorization: `${token}`
        }
    }

    const getUsers = async (sort) => {
        try {
            const { data } = await axios.post('http://localhost:3200/user/movement/get', {sort: sort} ,config);
            if (data)
                setUsers(data.users);
            console.log(data);
        } catch (err) {
            console.log(err);
            throw new Error('Error getting Users');
        }
    }
    const options = [{value: 'asc', label: 'Ascendente'}, {value: 'desc', label: 'Descendente'}]
    useEffect(() => {getUsers(sort)}, [sort]);
    return (
        <>
        <div className='vh-100'>
        <div className='container'>
                <div className="container-fluid text-white text-center" style={{ marginTop: '8%', marginBottom: '20px', backgroundImage: 'linear-gradient(0.25turn, #007bff, #00043a)' }}>
                    <div className="container py-4">
                        <h1 className="mb-1">Movimientos</h1>
                        <p>Gestión de movimientos</p>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className='mb-3 d-flex justify-content-start align-items-center align-self-center'>
                    <p className='mb-0' style={{marginRight: 10}}>Orden:</p>
                    <Select
                        defaultValue={options.find((option) => option.value === sort)}
                        options={options}
                        isSearchable = {false}
                        isClearable = {false}
                        onChange={handleSortChange}
                    />
                </div>
                <table className="table">
                    <thead className="text-light" style={{ backgroundColor: '#00043a' }}>
                        <tr>
                            <th scope="col">Posición</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">No. de cuenta</th>
                            <th scope="col">Movimientos</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                            user.map(({name, surname, accountNumber, movements}, index) => {
                                return (
                                    <tr className="text-dark" key={index}>
                                        <Users
                                            number={index+1}
                                            name={name}
                                            surname={surname}
                                            accountNumber={accountNumber}
                                            movements={movements}
                                        ></Users>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}
