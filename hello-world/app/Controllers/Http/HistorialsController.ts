// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
<<<<<<< Updated upstream
import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'
import schHistorial from 'App/Models/Historial'

export default class HistorialsController {
URL = Env.get('MONGO_URL')
public async autoincrement() {
  try {
    const con = mongoose.createConnection(this.URL)
    const preb = con.model('historialsensores', schHistorial)
    let s = await preb.aggregate([
      {
        $project: {
          id: 1,
        },
      },
      {
        $sort: {
          id: -1,
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
    const con = mongoose.createConnection(this.URL, {
      maxIdleTimeMS: 6000,
    })
    const preb = con.model('historialsensores', schHistorial)
    let idd = await this.autoincrement()
    const id = (await idd) + 1
    preValor:Object=datos.Valor
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
   public async updateHistorial({request}: HttpContextContract) {
    const datos = request.all()
    const con = mongoose.createConnection(this.URL, {
      maxIdleTimeMS: 6000,
    })
    let date = new Date()
    let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()]
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
=======
import Historial from 'App/Models/Historial';
import mongoose from 'mongoose'

export default class MostrarDatosController {

    public async mostrarHistorial()
    {
        const conn = await mongoose.createConnection('mongodb+srv://root:ZXCVzxcv1234@sandbox1.1jic6.mongodb.net/proyecto').
        asPromise();
        try {
            return('Se hizo la conexion correctamente')
            conn.readyState;
        } catch (error) {
            return('No se pudo hacer la conexion')
        }
    }

    public async store({request}: HttpContextContract)
    {
        const datos = request.all()
        const con = mongoose.createConnection(
          'mongodb+srv://root:AWDSawds8713@sandbox1.1jic6.mongodb.net/practicas_web',
          {
            maxIdleTimeMS: 6000,
          }
        )
        const preb = con.model('historial', Historial)
        const id=await idSensor+1;
        preb.insertMany
        ({
            idSensor: id,
            valor:datos.valor

        }).then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
    })
    }

    public async mostar(usuario) {
        const con = mongoose.createConnection(
          'mongodb+srv://root:ZXCVzxcv1234@sandbox1.1jic6.mongodb.net/proyecto'
        )
        const preb = con.model('historial', Historial)
        const buscar = preb
          .find({idUsuario:usuario})
          .then((data) => {
            console.log(data)
          })
          .catch((err) => {
            console.log(err)
          })
        return buscar
      }
>>>>>>> Stashed changes
}
