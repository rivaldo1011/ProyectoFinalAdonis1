import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'
import schSensor from 'App/Models/Sensor'
import { DateTime, Zone } from 'luxon'
export default class SensorsController {
  URL = Env.get('MONGO_URL')
  //EXTRAS
  public async autoincrement() {
    try {
      const con = mongoose.createConnection(this.URL)
      const preb = con.model('sensores', schSensor)
      let s = await preb.aggregate([
        {
          $project: {
            idSensor: 1,
          },
        },
        {
          $sort: {
            idSensor: -1,
          },
        },
        { $limit: 1 },
      ])
      let res
      s.forEach((element) => {
        res = element.idSensor
      })
      return res
    } catch (error) {
      return error
    }
  }
  //CREAR
  public async crearSensor({ request }: HttpContextContract) {
    const datos = request.all()
    const con = mongoose.createConnection(this.URL, {
      maxIdleTimeMS: 6000,
    })
    //var preGPIO={datos.GPIO}
    //fgpio.forEach(element => {
    //   preGPIO.push(element)
    //});

    const preb = con.model('sensores', schSensor)
    let idventa = await this.autoincrement()
    const id = (await idventa) + 1
    preb
      .insertMany({
        idSensor: id,
        idUsuario: datos.idUsuario,
        NombreSensor: datos.NombreSensor,
        Descripcion: datos.Descripcion,
        Estado: datos.Estado,
        GPIO: datos.GPIO,
        IMG: datos.IMG,
        Fechadecreacion: Date.now(),
        Fechadeactualisacion: '',
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
    return { hola: 'xd' }
  }
  //mostrar
  public async getSensores() {
    const con = mongoose.createConnection(this.URL)
    const preb = con.model('sensores', schSensor)
    const buscar = preb
      .find({})
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
    return buscar
  }
  //editar
  public async updateSensores({ request }: HttpContextContract) {
    const datos = request.all()
    const con = mongoose.createConnection(this.URL, {
      maxIdleTimeMS: 6000,
    })
    let date = new Date()
    let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
    const preb = con.model('sensores', schSensor)
    preb
      .updateOne({idSensor: datos.idSensor},{
        idUsuario: datos.idUsuario,
        NombreSensor: datos.NombreSensor,
        Descripcion: datos.Descripcion,
        Estado: datos.Estado,
        GPIO: datos.GPIO,
        IMG: datos.IMG,
        Fechadeactualisacion: Date.now(),
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  //pruebas
  public async pruebaslista({ request }: HttpContextContract) {
    const todo = request.all()
    var s = {}
    s = todo.GPIO.toJSON()
    console.log(s)
  }
}
