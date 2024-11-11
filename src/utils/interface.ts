export interface ConsultarCEPRes {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
}

export interface ConsultarCEPError {
  name: string;
  message: string;
  type: string;
  errors: [
    {
      name: string;
      message: string;
      service: string;
    },
    {
      name: string;
      message: string;
      service: string;
    },
  ];
}
