// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'
import schHistorial from 'App/Models/Historial'
import DHT11M from 'App/Models/DHT11'
import HC_SR04M from 'App/Models/HC_SR04'
import MPU6050M from 'App/Models/MPU6050'
import MotoresM from 'App/Models/Motores'
import KY_031M from 'App/Models/KY_031'
let URL = Env.get('MONGO_URL')
let mongo = mongoose.connect(URL, { maxIdleTimeMS: 1000 });
export default class HistorialsController {
  public async autoincrement() {
    try {
      const preb = (await mongo).model('historialsensores', schHistorial)
      let s = await preb.aggregate([{
        $project: {
          idH: 1,
          _id: 0
        }
      }, {
        $sort: {
          idH: -1
        }
      }, { $limit: 1 }])
      let res
      s.forEach((element) => {
        res = element.id
      })
      return res
    } catch (error) {
      return error
    }
  }
  //mostrar
  public async getHistorial({ request }: HttpContextContract) {
    let datos = request.all()
    const preb = (await mongo).model('historialsensores', schHistorial)
    const buscar = preb
      .find({ 'idUsuario': datos.idUsuario, })
      .then((schHistorial) => {
        return schHistorial
      })
      .catch((err) => {
        console.log(err)
      })
    return buscar
  }
  //CREAR
  public async crearHistorial({ request, response }) {
    /*
    const datos = request.all()
    const preb = (await mongo).model('historialsensores', schHistorial)
    let idd = await this.autoincrement()
    const id = (await idd) + 1
    preb
      .insertMany({
        id: id,
        idSensor: datos.idsensor,
        Valor: datos.Valor,
        Fechadecreacion: Date.now(),
        Fechadeactualizacion: ''
      })
      .then((data) => {
        console.log(data)
        return data
      })
      .catch((err) => {
        console.log(err)
      })
      */
    const datos = request.all()
    let ultimo = this.autoincrement()
    let id = await ultimo + 1
    switch (datos.idSensor) {
      case 1:
        await mongoose.connect(URL)
        response = new DHT11M.DHT11M({
          idH: id,
          idRU: request.input('idRU'),
          idSensor: 2,
          Temperatura: request.input('Temperatura'),
          Humedad: request.input('Humedad'),
          Fechacreacion: Date.now()
        }).then((data) => {
          console.log(data)
          return data
        })
          .catch((err) => {
            console.log(err)
          })
        response.save()
        return response
        break;
      case 2:
        await mongoose.connect(URL)
        response = new HC_SR04M.HC_SR04M({
          idH: id,
          idRU: request.input('idRU'),
          idSensor: 2,
          Distacia: request.input('Distacia'),
          Fechacreacion: Date.now()
        }).then((data) => {
          console.log(data)
          return data
        })
          .catch((err) => {
            console.log(err)
          })
        response.save()
        return response
        break;
      case 3:
        await mongoose.connect(URL)
        response = new KY_031M.KY_031M({
          idH: id,
          idRU: request.input('idRU'),
          idSensor: 3,
          Deteccion: request.input('Deteccion'),
          Fechacreacion: Date.now()
        }).then((data) => {
          console.log(data)
          return data
        })
          .catch((err) => {
            console.log(err)
          })
        response.save()
        return response
        break;
      case 4:
        await mongoose.connect(URL)
        response = new MPU6050M.MPU6050M({
          idH: id,
          idRU: request.input('idRU'),
          idSensor: 4,
          acel_x: request.input('acel_x'),
          acel_y: request.input('acel_y'),
          acel_z: request.input('acel_z'),
          ang_x: request.input('ang_x'),
          ang_y: request.input('ang_y'),
          ang_z: request.input('ang_z'),
          Fechacreacion: Date.now()
        }).then((data) => {
          console.log(data)
          return data
        })
          .catch((err) => {
            console.log(err)
          })
        response.save()
        return response
        break;
      case 5:
        await mongoose.connect(URL)
        response = new MotoresM.MotoresM({
          idH: id,
          idRU: request.input('idRU'),
          idSensor: 5,
          Posicion: request.input('Posicion'),
          Fechacreacion: Date.now()
        }).then((data) => {
          console.log(data)
          return data
        })
          .catch((err) => {
            console.log(err)
          })
        response.save()
        return response
        break;
      case 6:
        await mongoose.connect(URL)
        response = new MotoresM.MotoresM({
          idH: id,
          idRU: request.input('idRU'),
          idSensor: 6,
          Posicion: request.input('Posicion'),
          Fechacreacion: Date.now()
        }).then((data) => {
          console.log(data)
          return data
        })
          .catch((err) => {
            console.log(err)
          })
        response.save()
        return response
        break;

      default:
        return response.badRequest()
        break;
    }
  }
  //editar
  public async updateHistorial({ params, request, response }: HttpContextContract) {
    const datos = request.all()
    //let date = new Date()
    //let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
    const preb = (await mongo).model('historialsensores', schHistorial)

    preb
      .updateOne({ id: params.id }, {
        idSensor: datos.idSensor,
        Valor: datos.Valor,
        Fechadeactualizacion: Date.now()
      })
      .then((data) => {
        return response.finished
      })
      .catch((err) => {
        console.log(err)
      })
  }
  //eliminar
  public async deleteSensor({ params, response }: HttpContextContract) {

    const preb = (await mongo).model('historialsensores', schHistorial)
    preb
      .deleteOne({ id: params.id })
      .then((data) => {
        return response.finished
        //console.log(data)
      })
      .catch((err) => {
        return err
      })
  }
}
