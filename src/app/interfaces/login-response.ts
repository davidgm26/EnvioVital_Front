import {Alerta} from "./alerta";

export interface LoginResponse {
    token: string;
    id: number;
    username: string;
    rol: string;
    alertas: Alerta[]
}
