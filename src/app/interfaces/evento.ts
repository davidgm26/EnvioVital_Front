import { EventoAlmacenResponse } from "./evento-almacen-response";

export interface Evento {
    id:          number;
    nombre:      string;
    descripcion: string;
    activo:      boolean;
    provincia:   string;
    almacenes:   EventoAlmacenResponse[];
}
