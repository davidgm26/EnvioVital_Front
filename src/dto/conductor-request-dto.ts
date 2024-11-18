export interface ConductorRequestDTO {
  nombre: string;
  apellidos: string;
  dni: string;
  direccion: string;
  telefono: string;
  fechaNacimiento: string; // Date as string in ISO format
  email: string;
  usuario: { username: string;
    password: string;
    // Otros campos de usuario, si es necesario
  };
}
