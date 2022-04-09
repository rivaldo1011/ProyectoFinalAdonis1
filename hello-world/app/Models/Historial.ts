//import { DateTime } from 'luxon';
import mongoose, { Schema } from 'mongoose';

const schHistorial=new Schema({
  id: Number,
  idSensor: Number,
  Valor: Array,
  Fechadecreacion: Date,
  Fechadeactualizacion: Date
});
export default schHistorial;