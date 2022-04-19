import { DateTime } from 'luxon';
import {Schema,model} from 'mongoose'
export default class DHT11M{
  static  schDHT11=new Schema({
    idH:Number,
    idRU:Number,
    idSensor:Number,
    Temperatura:Number,
    Humedad:Number,
    Fechacreacion:Date
},{
  versionKey:false
});
static DHT11M:any=model('historialsensores',this.schDHT11);
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