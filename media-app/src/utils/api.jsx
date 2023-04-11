import axios from 'axios';
import { URL_API_LIST_SONGS,URL_API_GET_SONG,URL_API_POST_UPDATE_SONG } from './consts';

const serverAxios = axios.create({
    timeout: 5000,
})

export const apiGetListaCanciones = async () =>{
    let result = await serverAxios.get(URL_API_LIST_SONGS).
    then((response) => response.data).
    catch((err) =>err.message);

    if(Array.isArray(result)){
        return result;
    }else{
        console.error(result);
        return [];
    }
}

export const apiUpdateSong = async (data) =>{
    let result = await serverAxios.post(URL_API_POST_UPDATE_SONG,data).
    then((response) => response).
    catch((err) =>err.message);
    if(result.status === 200){
        //console.log(result.data);
        return result.status;
    }else{
        console.error(result);
        return result.status;
    }
}







/*
export const apiGetCancion = async (cancion) =>{
    let err =false;
    let result = await serverAxios.get(URL_API_GET_SONG,{
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'audio/mp3'
        }
      }).
    then((response) => response.data).
    catch((error) =>err=true);

    if(err){
        return null;
    }else{
        const blob = new Blob([result], {
            type: 'audio/mp3'
        });

        return URL.createObjectURL(blob);
    }
}
*/