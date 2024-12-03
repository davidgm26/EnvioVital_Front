import { AlmacenResponse } from "./almacen-response";

export interface EventoAlmacenResponse {
    id: number;
    idEvento: number;
    idAlmacen: number;
    nombreAlmacen: string;
    nombreEvento: string;
    almacen: AlmacenResponse;
}
