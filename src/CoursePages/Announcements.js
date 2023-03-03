import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState, useEffect} from 'react'

function Announcements() {
  const location = useLocation();
  const courseId = location.state?.courseId;
  return (
    <div>
    </div>
  )
}

export default Announcements
