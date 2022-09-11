import React from 'react'
import { Link } from 'react-router-dom'
import "./Landing.css"

export default function Landing(){
    return(
        <div className='background'>
            <Link to="/dogs">
            <h1>Soy Landing</h1>
            </Link>
            
        </div>
    ) 
        
    
}