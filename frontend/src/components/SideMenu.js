import React, { useState } from 'react'
import SideNav,{NavItem,NavIcon,NavText} from "@trendmicro/react-sidenav"
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Link } from 'react-router-dom';


const SideMenu = () => {
    const [visible, setVisible] = useState(false)

    const itemStyle = {
        display: 'block',
        height: '100%',
        width: '100%',
        textDecoration: 'none'
      };


  return (
    <SideNav 
        onSelect={(selected) =>{
            console.log(selected)
        }}
    >
        <SideNav.Toggle onClick={()=>setVisible(!visible)} expanded={!visible}/>
        <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="home">
                <NavIcon>
                </NavIcon>
                <NavText className='nav-item' style={itemStyle}>
                    <Link className='nav-item-link' to={'/home'} style={itemStyle}>Home</Link>
                </NavText>
            </NavItem>
            <NavItem eventKey="ver-fotos">
                <NavIcon>
                <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText  style={itemStyle}>
                <Link to={'/ver-fotos'}  style={itemStyle}>Ver fotos</Link>
                </NavText>
            </NavItem>
            <NavItem eventKey="subir-foto">
                <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText  style={itemStyle}>
                    <Link to={'/subir-foto'}  style={itemStyle}>Subir foto</Link>
                </NavText>
            </NavItem>
            <NavItem eventKey="editar-perfil">
                <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText style={itemStyle}>
                    <Link to={'/editar-perfil'} style={itemStyle}>Editar perfil</Link>
                </NavText>
            </NavItem>
            <NavItem eventKey="editar-albumes">
                <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText style={itemStyle}>
                    <Link to={'/editar-albumes'} style={itemStyle}>Editar albumes</Link>
                </NavText>
            </NavItem>
            <NavItem eventKey="cerrar-sesion">
                <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText style={itemStyle}>
                    <Link to={'/'} style={itemStyle}>Cerrar sesion</Link>
                </NavText>
            </NavItem>

        </SideNav.Nav>
    </SideNav>
  )
}

export default SideMenu