import { DateTime } from 'luxon';
import {Schema,model} from 'mongoose'
export default class MotoresM{
  static  schMotores=new Schema({
    idH:Number,
    idRU:Number,
    idSensor:Number,
    Posicion:String,
    Fechacreacion:Date
},{
  versionKey:false
});
static MotoresM:any=model('historialsensores',this.schMotores);
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