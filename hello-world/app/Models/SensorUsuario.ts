import { DateTime } from 'luxon';
import {Schema,model} from 'mongoose'
export default class SensorUsuarioM{
  static  schSensorUsuario=new Schema({
    idRU: Number,
  idUsuario: Number,
  idSensor: Number
},{
  versionKey:false
});
static SensorUsuarioM:any=model('sensoresusuarios',this.schSensorUsuario);
}
  /*
  self.idSensor = 0
  self.idUsuario = 0
  self.NombreSensor = 
  self.Descripcion = 
  self.Fechadecreacion = 
  self.Fechadeactualisacion = 
  self.Estados = [indefinido, habilitado, deshabilitado]
  self.Estado = self.Estados[0]
  self.GPIO = list()
  self.IMG = 
  */