
export interface AlmacenRequestDTO {
  nombre: string;
  direccion: string;
  email: string;
  idProvincia: number;
  descripcion: string;
  usuario: {
     username: string;
     password: string;
  };
  fotoUrl: string;
}
