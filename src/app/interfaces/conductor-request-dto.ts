import { Usuario } from "./usuario";

export interface ConductorRequestDTO {
  nombre: string;
  apellidos: string;
  dni: string;
  direccion: string;
  telefono: string;
  fechaNacimiento: string; 
  email: string;
  usuario: Usuario;
}
