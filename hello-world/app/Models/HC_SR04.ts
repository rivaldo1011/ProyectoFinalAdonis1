import { DateTime } from 'luxon';
import {Schema,model} from 'mongoose'
export default class HC_SR04M{
  static  schHC_SR04=new Schema({
    idH:Number,
    idRU:Number,
    idSensor:Number,
    Distacia:Number,
    Fechacreacion:Date
},{
  versionKey:false
});
static HC_SR04M:any=model('historialsensores',this.schHC_SR04);
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