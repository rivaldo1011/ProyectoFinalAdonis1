import { DateTime } from 'luxon';
import {Schema,model} from 'mongoose'
export default class SensorM{
  static  schSensor=new Schema({
  idSensor: Number,
  idUsuario: Number,
  NombreSensor: String,
  Descripcion: String,
  Estado: String,
  GPIO:Object,
  IMG: String,
  Fechadecreacion: Date,
  Fechadeactualisacion: Date
},{
  versionKey:false
});
static SensorM:any=model('sensores',this.schSensor);
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