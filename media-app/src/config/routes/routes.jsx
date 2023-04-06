import {createBrowserRouter} from 'react-router-dom'
import Home from '../../paginas/Home'
import GestionarSongs from '../../paginas/GestionarSongs'
import { PlayList } from '../../paginas/PlayList'

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/manage/songs",
        element:<GestionarSongs/>
    },
    {
        path:"/playlist",
        element:<PlayList/>
    }
]);