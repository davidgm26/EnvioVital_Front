import { Usuario } from "./usuario";

export interface AlmacenRequestDTO {
  nombre: string;
  direccion: string;
  email: string;
  idProvincia: number;
  descripcion: string;
  usuario: Usuario;
}
