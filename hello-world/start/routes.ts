import Route from '@ioc:Adonis/Core/Route'
Route.get('/', async () => {
  return { hello: 'world' }
})
Route.group(() => {
  //AUTH-SESION
  Route.get('token', async ({ auth }) => {
    await auth.use('api').authenticate()
    console.log(auth.use('api').user!)
    return { resp: 'activo' }
  })
  Route.get('srevisarToken', 'AuthController.VerificarToken')
  Route.get('straerUsuario', 'AuthController.getUser')
  Route.post('scerrarSesion', 'AuthController.Logout')
  //AUTH-SENSORES 

  Route.get('smostrarSensores', 'SensorsController.getSensores')
  Route.post('screarSensores', 'SensorsController.crearSensor')
  Route.put('supdateSensores/:id', 'SensorsController.updateSensores')
  Route.delete('seliminarSensores/:id', 'SensorsController.deleteSensor')

  //AUTH-HISTORIAL
  Route.get('smostrarHistorial', 'HistorialsController.getHistorial')
  Route.post('screarHistorial', 'HistorialsController.crearHistorial')
  Route.put('supdateHistorial/:id', 'HistorialsController.updateHistorial')
  Route.delete('sdeleteHistorial/:id', 'HistorialsController.deleteSensor')
}).middleware('auth')

//LOGIN
  Route.post('Login', 'AuthController.Login')
  Route.post('Register', 'AuthController.register')
//SENSORES 
  Route.get('mostrarSensores', 'SensorsController.getSensores')
  Route.post('crearSensores', 'SensorsController.crearSensor')
  Route.put('updateSensores/:id', 'SensorsController.updateSensores')
  Route.delete('eliminarSensores/:id', 'SensorsController.deleteSensor')
  Route.get('Sensoresincrement', 'SensorsController.autoincrementSEN')
//HISTORIAL
  Route.get('mostrarHistorial', 'HistorialsController.getHistorial')
  Route.post('crearHistorial', 'HistorialsController.crearHistorial')
  Route.put('updateHistorial/:id', 'HistorialsController.updateHistorial')
  Route.delete('deleteHistorial/:id', 'HistorialsController.deleteSensor')

  
  
  Route.get('revisarToken', 'AuthController.VerificarToken')
  Route.get('pruebaslista', 'SensorsController.pruebaslista')