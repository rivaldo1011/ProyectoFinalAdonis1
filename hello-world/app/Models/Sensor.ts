import { DateTime } from 'luxon';
import mongoose, { Schema } from 'mongoose';

const schSensor=new Schema({
  idSensor: Number,
  idUsuario: Number,
  NombreSensor: String,
  Descripcion: String,
  Estado: String,
  GPIO: Array,
  IMG: String,
  Fechadecreacion: DateTime,
  Fechadeactualisacion: DateTime
});
export default schSensor;
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