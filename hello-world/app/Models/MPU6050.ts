import { DateTime } from 'luxon';
import {Schema,model} from 'mongoose'
export default class MPU6050M{
  static  schMPU6050=new Schema({
  idH:Number,
    idRU:Number,
    idSensor:Number,
    acel_x:Number,
    acel_y:Number,
    acel_z:Number,
    ang_x:Number,
    ang_y:Number,
    ang_z:Number,
    Fechacreacion:Date
},{
  versionKey:false
});
static MPU6050M:any=model('historialsensores',this.schMPU6050);
}
  /*
  self.idSensor = 0
  self.idUsuario = 0
  self.NombreSensor = ""
  self.Descripcion = ""
  self.Fechadecreacion = ""
  self.Fechadeactualisacion = ""
  self.Estados = ["indefinido", "habilitado", "deshabilitado"]
  self.Estado = self.Estados[0]
  self.GPIO = list()
  self.IMG = ""
  */