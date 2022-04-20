import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'
import SensorM from 'App/Models/Sensor'
//import { DateTime, Zone } from 'luxon'
let URL = Env.get('MONGO_URL2');
let mongo = mongoose.connect(URL, { maxIdleTimeMS: 1000 });
export default class SensorsController {
  //EXTRAS
  public async autoincrementSEN() {
    try {
      const preb = SensorM.SensorM
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
  public async crearSensor({ request, response }) {
    let datos=request.all()
    await mongoose.connect(URL) 
    let autoinc=this.autoincrementSEN()
    let id=await autoinc+1
    if (id=="NaN" || id==null){id+=1};
      response=new SensorM.SensorM({datos})
     response.save()
     return response
    /*
    const datos = request.all()
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
      */
  }
  //mostrar
  public async getSensores({ request, response }: HttpContextContract) {
    //poner filtro para usuario logueado
    response=await  SensorM.SensorM.find({})
    return response
  }
  //editar
  public async updateSensores({ params, request, response }: HttpContextContract) {

    const datos = request.all()
    const preb = SensorM.SensorM
    preb
      .updateOne({ idSensor: params.id }, {datos})
      .then((data) => {
        //console.log(data)
        return response.ok
      })
      .catch((err) => {
        return err
      })
  }
  //eliminar
  public async deleteSensor({ params, request, response }: HttpContextContract) {
    // const datos = request.all()
    const preb = SensorM.SensorM
    preb
      .deleteOne({ idSensor: params.id })
      .then((data) => {
        return response.finished
        //console.log(data)
      })
      .catch((err) => {
        return err
      })
  }
  //pruebas
  public async pruebaslista() {
    /*
    let result = "{hola:1,xd:1}"
    let pre = []
    pre.push(result)
    console.log(pre[0])
    let s = typeof (pre[0])
    console.log(s)
    let prer=pre[0].split("}{,:")
    console.log(prer)
    */
  }
}
