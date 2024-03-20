// Inicializando nuestra 'base de datos'
const repositorio = new Repository()

// Inicializando los selectores que utilizaremos
const formulario = document.getElementById('formulario')
const containerTarjetas = document.getElementById('containerTarjetas')
const buttonAddActivities = document.getElementById('buttonAddActivity')

// Verifiacion de datos del formulario
const datosForm = function (formulario) {
  const titulo = formulario.titulo.value
  const descripcion = formulario.descripcion.value
  const url = formulario.url.value
  return { titulo, descripcion, url }
}

const verificarCampos = function () {
  const elementosFormulario = formulario.elements
  for (let i = 0; i < elementosFormulario.length; i++) {
    if (elementosFormulario[i].nodeName === 'INPUT' && elementosFormulario[i].value === '') {
      return false
    }
  }
  return true
}

// Creando el html de las tarjetas de actividades
const crearTarjeta = function (id, title, description, imgURL) {
  const nuevaTarjeta = document.createElement('div')
  const tituloNuevaTarjeta = document.createElement('h3')
  const descripcionNuevaTarjeta = document.createElement('p')
  const imagenNuevaTarjeta = document.createElement('img')
  const basurero = document.createElement('span')

  containerTarjetas.style.setProperty('display', 'flex')
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

  basurero.addEventListener('click', eliminarTarjetas) // Escuchador del evento eliminar tarjetas

  return nuevaTarjeta
}

// Creo una funcion que me ayude a renderizar las tarjetas para luego utilizarla cada vez que lo necesite
const refrescarTarjetas = function () {
  containerTarjetas.innerHTML = ''
  const tarjetasHTML = repositorio.getAllActivities().map(activity => {
    return crearTarjeta(activity.id, activity.title, activity.description, activity.imgURL)
  })
  tarjetasHTML.forEach(tarjeta => {
    containerTarjetas.appendChild(tarjeta)
  })
  if (repositorio.activities.length < 1) {
    containerTarjetas.style.setProperty('display', 'none')
  }
  if (repositorio.activities.length > 0) {
    containerTarjetas.style.setProperty('display', 'flex')
  }
}

// Creacion de nuevas tarjetas desde el formulario
const nuevaActivity = function (event) {
  event.preventDefault()
  if (verificarCampos()) {
    const { titulo, descripcion, url } = datosForm(formulario)
    repositorio.createActivity(titulo, descripcion, url)
    formulario.reset()
    repositorio.saveActivities()
    refrescarTarjetas()
  } else {
    alert('Por favor, completa todos los campos del formulario.')
  }
}

buttonAddActivities.addEventListener('click', nuevaActivity)

// Eliminando Tarjetas
const eliminarTarjetas = function (event) {
  let elementoClickeado = event.target

  while (elementoClickeado && !elementoClickeado.classList.contains('card')) {
    elementoClickeado = elementoClickeado.parentElement
  };

  if (elementoClickeado && elementoClickeado.classList.contains('card')) {
    const idTarjetaEliminar = elementoClickeado.id
    repositorio.deleteActivity(idTarjetaEliminar)
    repositorio.saveActivities()
    refrescarTarjetas()
  }
}.bind(repositorio)

refrescarTarjetas()