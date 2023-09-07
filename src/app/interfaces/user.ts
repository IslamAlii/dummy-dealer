export interface UserLoginSentData {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  code: number;
  body: any;
  message: string;
  ok: boolean;
  token: string;
}

export interface userRegisterSentData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  address: string;
  status: string;
  photo: string;
  whatsapp_num: number;
  facebook: string;
  website: string;
  payment_method: string;
  payment_method_number: string;
}
