import { useRef, useState } from 'react'
import '../assets/css/material-kit.min.css'
import '../assets/paginas/Home.css'
import '../components/ListaCanciones'
import ListaCanciones from '../components/ListaCanciones'
import ReproductorAudio from '../components/ReproductorAudio'


function Home() {
  const [listaCanciones, setListaCanciones] = useState([]);
  const [cancion, setCancion] = useState(null);

  const _handleSetListaCanciones = (data) => {
    setListaCanciones(data);
  }
  const _handleSetCancion = (data) => {
    setCancion(data);
  }

  const eventos = {
    _handleSetListaCanciones,
    _handleSetCancion,
    listaCanciones
  }

  return (
    <div className="contenedorPage">
      <div className='contendorElementos'>
        <div className='divCanciones'>
          <ListaCanciones eventos={eventos} />
        </div>
        <div className='divReproductor'>
          <label className='titulo'>{cancion} </label>
          <ReproductorAudio cancion={cancion} />
        </div>
      </div>

    </div>
  )
}

export default Home
