import connection from './connection.mts'
import './render.mts'
document.addEventListener('keydown',(event: KeyboardEvent) =>{
    if(event.key === 'w' || event.key === 'W' || event.key === 'ц' || event.key === 'Ц'){
        connection.invoke("OnForward")
    }
    if(event.key === 'd' || event.key === 'D' || event.key === 'в' || event.key === 'В'){
        connection.invoke("OnRightMove")
    }
    if(event.key === 's' || event.key === 'S' || event.key === 'ы' || event.key === 'Ы'){
        connection.invoke("OnBackward")
    }
    if(event.key === 'a' || event.key === 'A' || event.key === 'ф' || event.key === 'Ф' ){
        connection.invoke("OnLeftMove")
    }
});
