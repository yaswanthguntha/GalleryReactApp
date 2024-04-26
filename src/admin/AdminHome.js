import React, { useEffect, useState } from 'react'
import './admin.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from './../config';

export default function AdminHome() {

  const [counts, setCounts] = useState([]);

  useEffect(() => {
      fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const response = await axios.get(`${config.url}/analysis`);
      setCounts(response.data);
    } catch (error) {

    }
  };

  return (
    <div>
      <div className="admin-home">
        <div className="controls">
          <Link to="/viewcustomers"><h3 className="operations"><img className="icon" src="./customer.png" alt="" />Customer Details</h3></Link>
          <Link to="/viewartists"><h3 className="operations"><img className="icon" src="./artist.png" alt="" />Artist Details</h3></Link>
          <Link to="/viewartworks"><h3 className="operations"><img className="icon" src="./artwork.png" alt="" />Artwork Details</h3></Link>
          <Link to=""><h3 className="operations"><img className="icon" src="./order.png" alt="" />Order Details</h3></Link>
          <Link to=""><h3 className="operations"><img className="icon" src="./transaction.png" alt="" />Transaction Details</h3></Link>
          <Link to="/viewqueries"><h3 className="operations"><img className="icon" src="./queries.png" alt="" />User Queries</h3></Link>
          <Link to="/viewfeedbacks"><h3 className="operations"><img className="icon" src="./feedback.png" alt="" />Feedback</h3></Link>
        </div>
        <div className="statistics">
            <div className="stats">
              <span className="stat">STATS</span>
              <div className="count"><span>Total Users</span><span className="num">{(counts.artistCount + counts.customerCount) ? counts.artistCount + counts.customerCount : 0}</span></div>
              <div className="count"><span>Artists</span><span className="num">{(counts.artistCount) ? counts.artistCount : 0}</span></div>
              <div className="count"><span>Customers</span><span className="num">{(counts.customerCount) ? counts.customerCount : 0}</span></div>
            </div>
            <div className="stats">
              <span className="stat">STATS</span>
              <div className="count"><span>Total Artworks</span><span className="num">{(counts.artCount) ? counts.artCount : 0}</span></div>
              <div className="count"><span>Total Orders</span><span className="num">{(counts.orderCount) ? counts.orderCount : 0}</span></div>
              <div className="count"><span>Total Transactions</span><span className="num">{(counts.orderCount) ? counts.orderCount : 0}</span></div>
            </div>
        </div>
      </div>
    </div>
  )
}
