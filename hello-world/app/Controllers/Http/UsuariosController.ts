import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'
import SensorUsuarioM from 'App/Models/SensorUsuario'
//import { DateTime, Zone } from 'luxon'
let URL = Env.get('MONGO_URL2');
let mongo = mongoose.connect(URL, { maxIdleTimeMS: 1000 });
export default class UsuariosController {
    //EXTRAS

    public async autoincrementSEN() {
        try {
            const preb = SensorUsuarioM.SensorUsuarioM
            let s = await preb.aggregate([
                {
                    $project: {
                        idRU: 1,
                    },
                },
                {
                    $sort: {
                        idRU: -1,
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
    public async crearusuarioSensor({ request, response }) {
        let datos = request.all()
        await mongoose.connect(URL)
        let autoinc = this.autoincrementSEN()
        let id = await autoinc + 1
        if (id == "NaN" || id == null|| id == 0) { id += 1 };
        response = new SensorUsuarioM.SensorUsuarioM({
            idRU:id,
            idUsuario:datos.idUsuario,
            idSensor:datos.idSensor
      })
        response.save()
        return response
    }
    //mostrar
    public async getusuarioSensores({ request, response }: HttpContextContract) {
        //poner filtro para usuario logueado
        response = await SensorUsuarioM.SensorUsuarioM.find({})
        return response
    }
    //editar
    public async updateusuarioSensores({ params, request, response }: HttpContextContract) {

        const datos = request.all()
        const preb = SensorUsuarioM.SensorUsuarioM
        preb
            .updateOne({ idRU: params.id }, { idUsuario:datos.idUsuario,
                idSensor:datos.idSensor })
            .then((data) => {
                //console.log(data)
                return response.ok
            })
            .catch((err) => {
                return err
            })
    }
    //eliminar
    public async deleteusuarioSensor({ params, request, response }: HttpContextContract) {
        // const datos = request.all()
        const preb = SensorUsuarioM.SensorUsuarioM
        preb
            .deleteOne({ idRU: params.id })
            .then((data) => {
                return response.finished
                //console.log(data)
            })
            .catch((err) => {
                return err
            })
    }
}
