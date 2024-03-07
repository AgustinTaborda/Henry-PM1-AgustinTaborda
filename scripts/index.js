
class Activity {
    constructor (id, title, description, imgURL) {
        this.id = id
        this.title = title
        this.description = description
        this.imgURL = imgURL 
    }
}

class Repository {
    constructor () {
        this.activities = JSON.parse(localStorage.getItem('activities')) || [];
        this.nextId = JSON.parse(localStorage.getItem('nextId')) || 1;
    }

    saveActivities() {
        localStorage.setItem('activities', JSON.stringify(this.activities));
    }
    
    getAllActivities() {
        return this.activities;
    }
    
    createActivity(title, description,imgURL) {
        const id = this.nextId++;
        const activity = new Activity (id,title,description,imgURL);
        this.activities.push(activity)
        localStorage.setItem('nextId', JSON.stringify(this.nextId));
    }
    
    deleteActivity(id) {
        let indexToDelete = -1;
        for (let i = 0; i < this.activities.length; i++) {
            if (this.activities[i].id === parseInt(id)) {
                indexToDelete = i;
                break;
            }
        }
        if (indexToDelete !== -1) {
            this.activities.splice(indexToDelete,1);
        }
        return this.activities;
    }
} 

const repositorio = new Repository()

const formulario = document.getElementById('formulario')

const containerTarjetas = document.getElementById('containerTarjetas')

const buttonAddActivities = document.getElementById('buttonAddActivity')

const datosForm = function (formulario) {
    const titulo = formulario.titulo.value;
    const descripcion = formulario.descripcion.value;
    const url = formulario.url.value;
    return { titulo, descripcion, url };
}

const verificarCampos = function () {
    const elementosFormulario = formulario.elements
    for (let i = 0; i < elementosFormulario.length; i++) {
        if (elementosFormulario[i].nodeName === 'INPUT' && elementosFormulario[i].value === '') {
            return false
        } 
    }
    return true;
}

const crearTarjeta = function (id, title, description, imgURL) {
    const nuevaTarjeta = document.createElement('div')
    const tituloNuevaTarjeta = document.createElement('h3')
    const descripcionNuevaTarjeta = document.createElement('p')
    const imagenNuevaTarjeta = document.createElement('img')
    const basurero = document.createElement('span')
    
    containerTarjetas.style.setProperty('display','flex')
    nuevaTarjeta.className = 'card'
    nuevaTarjeta.id = id
    tituloNuevaTarjeta.textContent = title
    tituloNuevaTarjeta.className = 'cardTitle'
    descripcionNuevaTarjeta.textContent = description
    descripcionNuevaTarjeta.className = 'cardDescription'
    imagenNuevaTarjeta.src = imgURL
    basurero.innerHTML = 'X'
    basurero.className = 'basureroTarjetas'
    basurero.id = 'basureroTarjetas'

    nuevaTarjeta.appendChild(tituloNuevaTarjeta)
    nuevaTarjeta.appendChild(imagenNuevaTarjeta)
    nuevaTarjeta.appendChild(descripcionNuevaTarjeta)
    nuevaTarjeta.appendChild(basurero)
    containerTarjetas.appendChild(nuevaTarjeta)

    basurero.addEventListener('click', eliminarTarjetas)


    return nuevaTarjeta;
}

const refrescarTarjetas = function () {
    containerTarjetas.innerHTML = ''
    const tarjetasHTML = repositorio.getAllActivities().map(activity => {
        return crearTarjeta(activity.id, activity.title, activity.description, activity.imgURL)})
    tarjetasHTML.forEach(tarjeta => { 
        containerTarjetas.appendChild(tarjeta);
    })
    if (repositorio.activities.length < 1) {
        containerTarjetas.style.setProperty('display','none')
    }
    if (repositorio.activities.length > 0) {
        containerTarjetas.style.setProperty('display','flex')
    }
}


const nuevaActivity = function (event) {
    event.preventDefault();
    if (verificarCampos()) {

        const {titulo, descripcion, url} =  datosForm(formulario)
        repositorio.createActivity (titulo, descripcion, url);
        formulario.reset()
        repositorio.saveActivities();
        refrescarTarjetas();

    } else {
        alert('Por favor, completa todos los campos del formulario.');
    }
}

buttonAddActivities.addEventListener('click', nuevaActivity)

// Eliminando Tarjetas

const eliminarTarjetas = function (event) {
    let elementoClickeado = event.target
    
    while (elementoClickeado && !elementoClickeado.classList.contains('card')) {
        elementoClickeado = elementoClickeado.parentElement;
    };

    if (elementoClickeado && elementoClickeado.classList.contains('card')) {
        const idTarjetaEliminar = elementoClickeado.id;
        repositorio.deleteActivity(idTarjetaEliminar);
        repositorio.saveActivities();
        refrescarTarjetas();
        
        console.log(repositorio.activities)
    }
}.bind(repositorio)

refrescarTarjetas();
// module.export = { Activity , Repository};