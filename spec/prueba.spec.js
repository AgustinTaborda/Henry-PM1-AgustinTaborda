describe('demo', function () {
  it('Este test debe pasar siempre', function () {
    expect(4 + 2).toBe(6)
  })
})

const { Repository, Activity} = require('../scripts/index')

describe('La clase Repository', () => {
  it('Debe ser una clase', () => {
    expect(typeof Repository.prototype.constructor).toBe('function')
  })
  it('Debe tener el metodo createActivity', () => {
    const actividades = new Activity()
    expect(actividades.createActivity).toBeDefined()
  })
  it('El metodo createActivity debe sumar un nuevo elemento ', () => {
    const actividades = new Activity()
    actividades.createActivity('a','b','c')
    expect(actividades.getAllActivities().lenght).toBe(1)
  })
  it('Debe tener el metodo getAllActivities', () => {
    const actividades = new Activity()
    expect(actividades.getAllActivities()).toBeDefined()
  })
  it('El metodo getAllActivities debe ser un Array', () => {
    const actividades = new Activity()
    expect(Array.isArray(actividades.getAllActivities())).toBeTrue()
  })
  it('Debe tener el metodo deleteActivity', () => {
    const actividades = new Activity()
    expect(actividades.deleteActivity).toBeDefined()
  })
  
})