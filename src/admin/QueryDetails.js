import React, { useState,useEffect } from 'react'
import axios from 'axios';
import config from '../config';

export default function QueryDetails() 
{
    const [queries, setQueries] = useState([]);

    const fetchQueries = async () => {
        try {
            const response = await axios.get(`${config.url}/viewqueries`);
            setQueries(response.data);
        }
        catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
      fetchQueries();
    }, []);

    // const deleteCustomer = async (email) => {
    //     try {
    //         await axios.delete(`http://localhost:2032/deletecustomer/${email}`);
    //         fetchQueries();
    //     }
    //     catch (error) {
    //         console.error(error.message);
    //     }
    // }
    

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className="info">User Queries</h1>
      <div align="center">
      <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Query</th>
              <th>User Role</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(queries) && queries.length > 0 ? (
              queries.map((query, index) => (
                <tr key={index}>
                  <td>{query.name}</td>
                  <td>{query.email}</td>
                  <td>{query.message}</td>
                  <td>{query.role}</td>
                  {/* <td>
                    <button onClick={() => deleteCustomer(customer.email)} className='button'><img className="delete" src="./delete.png" alt="delete" /></button>
                  </td> */}
                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan="3">Data Not Found</td>
                </tr>
              )}
          </tbody>
        </table>
        </div>
    </div>
  )
}
