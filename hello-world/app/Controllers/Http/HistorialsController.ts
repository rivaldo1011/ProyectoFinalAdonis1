// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'
import schHistorial from 'App/Models/Historial'
let URL = Env.get('MONGO_URL')
let mongo = mongoose.connect(URL, { maxIdleTimeMS: 1000 });
export default class HistorialsController {

  public async autoincrement() {
    try {
      const preb = (await mongo).model('historialsensores', schHistorial)
      let s = await preb.aggregate([{
        $project: {
          id: 1,
          _id: 0
        }
      }, {
        $sort: {
          id: -1
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
  public async crearHistorial({ request }: HttpContextContract) {
    const datos = request.all()
    let preValor: Object = datos.Valor
    const preb = (await mongo).model('historialsensores', schHistorial)
    let idd = await this.autoincrement()
    const id = (await idd) + 1
    preb
      .insertMany({
        id: id,
        idSensor: datos.idsensor,
        Valor: preValor,
        Fechadecreacion: Date.now(),
        Fechadeactualizacion: ''
      })
      .then((data) => {
        return data
      })
      .catch((err) => {
        console.log(err)
      })
  }
  //editar
  public async updateHistorial({ params,request,response }: HttpContextContract) {
    const id = params.id
    const datos = request.all()
    //let date = new Date()
    //let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
    const preb = (await mongo).model('historialsensores', schHistorial)
    preb
      .updateOne({ 'idSensor': id.idSensor }, {
        idSensor: datos.idSensor,
        Valor: datos.valor,
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
  public async deleteSensor({params, response }: HttpContextContract) {
    const datos = params.all()
    const preb = (await mongo).model('historialsensores', schHistorial)
    preb
      .deleteOne({'id': datos.id })
      .then((data) => {
        return response.finished
        //console.log(data)
      })
      .catch((err) => {
        return err
      })
  }
}
