import { useRef, useState } from 'react'
import '../assets/paginas/Home.css'
import ListaCanciones from '../components/List/ListaCanciones'
import ReproductorAudio from '../components/Reproductor/ReproductorAudio'


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
        <div className='contenedorDivResproductor'>
          <ReproductorAudio cancion={cancion} />
 
        </div>
      </div>

    </div>
  )
}

export default Home
