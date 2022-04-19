import { DateTime } from 'luxon';
import {Schema,model} from 'mongoose'
export default class KY_031M{
  static  schKY_031=new Schema({
    idH:Number,
    idRU:Number,
    idSensor:Number,
    Deteccion:String,
    Fechacreacion:Date
},{
  versionKey:false
});
static KY_031M:any=model('historialsensores',this.schKY_031);
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