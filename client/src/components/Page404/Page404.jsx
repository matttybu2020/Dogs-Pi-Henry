import React from 'react'
import { Link } from 'react-router-dom'
import './Page404.css'

export default function Page404  () {
    return (
        <>
         <div className="spinner">
                <span>E</span>
                <span>R</span>
                <span>R</span>
                <span>O</span>
                <span>R</span>
                <br/>
                <span>4</span>
                <span>0</span>
                <span>4</span>
            </div>
            <div>
          <Link to="/dogs">
            <button className="button_to_home">Go home</button>
          </Link>
        </div>
        </>
    )
}