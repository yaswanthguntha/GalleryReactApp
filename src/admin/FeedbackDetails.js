import React, { useState,useEffect } from 'react'
import axios from 'axios';
import config from '../config';

export default function FeedbackDetails() 
{
    const [feedbacks, setFeedbacks] = useState([]);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get(`${config.url}/viewfeedbacks`);
            setFeedbacks(response.data);
        }
        catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
      fetchFeedbacks();
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
              <th>User Role</th>
              <th>Email</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(feedbacks) && feedbacks.length > 0 ? (
              feedbacks.map((query, index) => (
                <tr key={index}>
                  <td>{query.role}</td>
                  <td>{query.email}</td>
                  <td>{query.feedback}</td>
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
