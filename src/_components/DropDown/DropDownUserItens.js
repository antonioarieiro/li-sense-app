import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './DropDownUserItens.css'
import LisenseContext from '../../_context/LisenseContext'
import { GoogleLogout } from 'react-google-login'
import { clientId } from '../../_auth/LoginGoogle'
function DropDownUserItens(props) {

  const onSuccess = () => {
    setUser(false)
    console.log('Success logout')
   
  }
  const { setUser } = React.useContext(LisenseContext);

  return (
    <div className="DropDownUserItens">
      
      <i>{props.icon}</i>
      <span>{props.text}</span>
    
    </div>
  )
}

export default DropDownUserItens
