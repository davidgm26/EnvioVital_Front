// src/app/models/almacen-request-dto.model.ts
export interface AlmacenRequestDTO {
  nombre: string;
  direccion: string;
  email: string;
  idProvincia: number;
  descripcion: string;
  usuario: { username: string;
            password: string;
    // Otros campos de usuario, si es necesario
  };
}
