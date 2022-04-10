import Route from '@ioc:Adonis/Core/Route'
Route.get('/', async () => {
  return { hello: 'world' }
})
Route.group(() => {
  Route.get('token', async ({ auth }) => {
    await auth.use('api').authenticate()
    console.log(auth.use('api').user!)
    return { resp: 'activo' }
  })
}).middleware('auth')
//LOGIN
  Route.post('Login','AuthController.Login')
  Route.post('Register','AuthController.register')
//SENSORES 
  Route.get('mostrarSensores','SensorsController.getSensores')
  Route.post('crearSensores','SensorsController.crearSensor')
  Route.put('updateSensores','SensorsController.updateSensores')
  Route.delete('eliminarSensores','SensorsController.deleteSensor')