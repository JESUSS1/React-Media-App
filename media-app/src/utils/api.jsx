import axios from 'axios';

const serverAxios = axios.create({
    timeout: 5000,
})

export const apiGetListaCanciones = async () =>{
    const url = "http://192.168.3.5:3000/canciones"
    let result = await serverAxios.get(url).
    then((response) => response.data).
    catch((err) =>err.message);

    if(Array.isArray(result)){
        //console.log(result);
        return result;
    }else{
        console.error(result);
        return [];
    }
}

export const apiGetCancion = async (cancion) =>{
    const url = "http://192.168.3.5:3000/music/"+cancion;
    let err =false;
    let result = await serverAxios.get(url,{
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

    //console.log(typeof result);
    //console.log(result);

   /* if(Array.isArray(result)){
        //console.log(result);
        return result;
    }else{
        console.error(result);
        return [];
    }
    */
}