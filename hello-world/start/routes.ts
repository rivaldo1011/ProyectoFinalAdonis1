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
  Route.get('scerrarSesion', 'AuthController.Logout')
  //AUTH-SENSORES 

  Route.get('smostrarSensores', 'SensorsController.getSensores')
  Route.post('screarSensores', 'SensorsController.crearSensor')
  Route.put('supdateSensores', 'SensorsController.updateSensores')
  Route.delete('seliminarSensores', 'SensorsController.deleteSensor')

  //AUTH-HISTORIAL
  Route.get('smostrarHistorial', 'HistorialsController.getHistorial')
  Route.post('screarHistorial', 'HistorialsController.crearHistorial')
  Route.post('supdateHistorial', 'HistorialsController.updateHistorial')
  Route.post('sdeleteHistorial', 'HistorialsController.deleteSensor')
  //AUTH-Historial
  Route.get('sConexion', 'HistorialsController.mostrarHistorial')
  Route.put('sInsertarHistorial', 'HistorialsController.store')
  Route.get('sMostrarHistorial', 'HistorialsController.mostar')
}).middleware('auth')

//LOGIN
  Route.post('Login', 'AuthController.Login')
  Route.post('Register', 'AuthController.register')
//SENSORES 
  Route.get('mostrarSensores', 'SensorsController.getSensores')
  Route.post('crearSensores', 'SensorsController.crearSensor')
  Route.put('updateSensores', 'SensorsController.updateSensores')
  Route.delete('eliminarSensores', 'SensorsController.deleteSensor')
//HISTORIAL
  Route.get('mostrarHistorial', 'HistorialsController.getHistorial')
  Route.post('crearHistorial', 'HistorialsController.crearHistorial')
  Route.post('updateHistorial', 'HistorialsController.updateHistorial')
  Route.post('deleteHistorial', 'HistorialsController.deleteSensor')


  
  Route.get('revisarToken', 'AuthController.VerificarToken')