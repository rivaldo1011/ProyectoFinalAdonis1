import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'
import schSensor from 'App/Models/Sensor'
//import { DateTime, Zone } from 'luxon'
let URL = Env.get('MONGO_URL');
let mongo = mongoose.connect(URL, { maxIdleTimeMS: 1000 });
export default class SensorsController {
  URL = Env.get('MONGO_URL')
  //EXTRAS
  public async autoincrement() {
    try {
      const preb = (await mongo).model('sensores', schSensor)
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
  public async crearSensor({ request, response }: HttpContextContract) {
    const datos = request.all()
    //var preGPIO={datos.GPIO}
    //fgpio.forEach(element => {
    //   preGPIO.push(element)
    //});
    const preb = (await mongo).model('sensores', schSensor)
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
        return response.created
        //console.log(data)
      })
      .catch((err) => {
        return err
      })
  }
  //mostrar
  public async getSensores({ request }: HttpContextContract) {
    let datos = request.all()
    const preb = (await mongo).model('sensores', schSensor)
    await preb
      .find({ 'idUsuario': datos.idUsuario })
      .then((data) => {
        return data
      })
      .catch((err) => {
        return err
      })
  }
  //editar
  public async updateSensores({params,request,response }: HttpContextContract) {
    const id = params.all()
    const datos = request.all()
    const preb = (await mongo).model('sensores', schSensor)
    preb
      .updateOne({ 'idSensor': id.idSensor }, {
        NombreSensor: datos.NombreSensor,
        Descripcion: datos.Descripcion,
        Estado: datos.Estado,
        GPIO: datos.GPIO,
        IMG: datos.IMG,
        Fechadeactualisacion: Date.now(),
      })
      .then((data) => {
        //console.log(data)
        return response.ok
      })
      .catch((err) => {
        return err
      })
  }
  //eliminar
  public async deleteSensor({ request,response }: HttpContextContract) {
    const datos = request.all()
    const preb = (await mongo).model('sensores', schSensor)
    preb
      .deleteOne({ idSensor: datos.idSensor })
      .then((data) => {
        return response.finished
        //console.log(data)
      })
      .catch((err) => {
        return err
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
