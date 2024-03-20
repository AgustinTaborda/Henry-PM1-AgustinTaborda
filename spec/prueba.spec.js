// describe('demo', function () {
//   it('Este test debe pasar siempre', function () {
//     expect(4 + 2).toBe(6)
//   })
// })

const { Repository, Activity} = require('../scripts/index')

describe('La clase Repository', () => {

  let repositorio;
  beforeEach( function() {
    repositorio = new Repository()
  });

  it('Debe ser una clase', () => {
    expect(typeof Repository.prototype.constructor).toBe('function')
  })
  it('Debe tener el metodo createActivity', () => {
    expect(repositorio.createActivity).toBeDefined()
  })
  it('El metodo createActivity debe sumar un nuevo elemento ', () => {
    repositorio.createActivity('a','b','c')
    expect(repositorio.getAllActivities()).not.toBe(undefined)
  })
  it('Debe tener el metodo getAllActivities', () => {
    expect(repositorio.getAllActivities()).toBeDefined()
  })
  it('El metodo getAllActivities debe ser un Array', () => {
    expect(Array.isArray(repositorio.getAllActivities())).toBeTrue()
  })
  it('Debe tener el metodo deleteActivity', () => {
    expect(repositorio.deleteActivity).toBeDefined()
  })
  
})