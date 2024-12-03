import { AlmacenRegistrado } from "./almacen-registrado";

export interface EventoAlmacenResponse {
    id: number;
    idEvento: number;
    idAlmacen: number;
    nombreAlmacen: string;
    nombreEvento: string;
    almacen: AlmacenRegistrado;
}
