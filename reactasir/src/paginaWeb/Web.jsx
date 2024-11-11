import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'
import Contenido from './Contenido'
import Footer from './Footer'

function Web() {
  return (
    <>
    <Header/>
    <Contenido/>
    <Footer RRSS={[{nombre:"Facebook",url:"hola"},{nombre:"Instagram",url:"adios"},{nombre:"LinkedIn",url:"otra"},{nombre:"Google",url:"google"}]}/>
    </>
  )
}

export default Web