// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'
import schHistorial from 'App/Models/Historial'

export default class HistorialsController {
  URL = Env.get('MONGO_URL')
  public async autoincrement() {
    try {
      const con = mongoose.createConnection(this.URL)
      const preb = con.model('historialsensores', schHistorial)
      let s = await preb.aggregate([{$project: {
        id: 1,
        _id: 0
       }}, {$sort: {
        id: -1
       }}, {$limit: 1}])
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
  public async getHistorial() {
    const con = mongoose.createConnection(this.URL)
    const preb = con.model('historialsensores', schHistorial)
    const buscar = preb
      .find({})
      .then((schHistorial) => {
        return schHistorial
      })
      .catch((err) => {
        console.log(err)
      })
    return buscar
  }
  //CREAR
  public async Historial({ request }: HttpContextContract) {
    const datos = request.all()
    let preValor: Object = datos.Valor
    const con = mongoose.createConnection(this.URL)
    const preb = con.model('historialsensores', schHistorial)
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
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  //editar
  public async updateHistorial({ request }: HttpContextContract) {
    const datos = request.all()
    const con = mongoose.createConnection(this.URL, {
      maxIdleTimeMS: 6000,
    })
    //let date = new Date()
    //let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
    const preb = con.model('historialsensores', schHistorial)
    preb
      .updateOne({
        id: datos.id,
        idSensor: datos.idSensor,
        Valor: datos.valor,
        Fechadecreacion: Date.now(),
        Fechadeactualizacion: ''
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
