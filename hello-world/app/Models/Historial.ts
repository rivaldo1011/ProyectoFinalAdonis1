//import { DateTime } from 'luxon';
import mongoose, { Schema } from 'mongoose';

const schHistorial=new Schema({
  id: Number,
  idSensor: Number,
  Valor: Object,
  Fechadecreacion: Date,
  Fechadeactualizacion: Date
});
export default schHistorial;