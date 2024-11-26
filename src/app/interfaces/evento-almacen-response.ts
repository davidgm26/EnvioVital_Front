import { AlmacenRegistrado } from "./almacen-registrado";

export interface EventoAlmacenResponse {
    idEvento: number;
    idAlmacen: number;
    nombreAlmacen: string;
    nombreEvento: string;
    almacen: AlmacenRegistrado;
}
