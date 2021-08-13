const denegado = document.createElement(`p`)
const enviarNewsle = document.querySelector(`#enviar-newsle`);
const mailEnviado = document.querySelector(`#email-enviado`)
const respuestaMail = document.querySelector(`.boton-enviar-newsle`)

/* 
TENDRIA QUE PONER UN ID EN EL INPUT

*/



// eventos

enviarNewsle.addEventListener(`submit`, enviarMail)



function borrarMail(){
    denegado.classList.remove(`newsle-aprobado`)
    denegado.classList.remove(`newsle-denegado`)
    denegado.innerHTML = `  ` 
    
}


function enviarMail(e){

    e.preventDefault()
    
    
    const valorEmail = mailEnviado.value
    const dataMail = [`@gmail.com`, `@gmail.com.ar`, `@hotmail.com`]

    borrarMail()

    if(!valorEmail.includes(`@gmail.com`)){
    
        denegado.innerHTML = 
        `Error: Recuerda que el mail debe contener "@"`;
        denegado.classList.add(`newsle-denegado`)
        respuestaMail.appendChild(denegado)  

    }

    else{
        denegado.classList.add(`newsle-aprobado`)
        denegado.innerHTML = 
        `Genial! ya estas inscripto!`;
        respuestaMail.appendChild(denegado)
    }
}

