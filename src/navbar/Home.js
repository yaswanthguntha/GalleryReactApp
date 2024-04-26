import React from 'react'
import './main.css'

export default function Home() 
{
  return (
    <div>
        <section className="sec-1">
          <div className="home">
            <h3 className="main-title">WE WELCOME YOU</h3>
            <div className="content">
              <div className="back-drop">
                <div className="image">
                  <img src="./homeimg.jpg" alt="image_here"/>
                </div>
              </div>
              <div className="text">
                <p>Start your online Art viewing experience with us</p>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="home-sec">
          <div className="heading">
            <h3>Welcome</h3>
            <p>Start your online Art viewing experience with us</p>
          </div>
          <div className="back-drop">
            <div className="image">
              <img src="./homeimg.jpg" alt="image_here"/>
            </div>
          </div>
        </section> */}
    </div>
  )
}
