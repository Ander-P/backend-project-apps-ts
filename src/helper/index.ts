import axios from "axios";
import * as crypto from "crypto";
import { CharactersData } from "../types";

const apiKeyPrivate = process.env.MARVEL_API_KEY_PRIVATE;
const apiKeyPublic = process.env.MARVEL_API_KEY_PUBLIC;


function generateHash(ts: string): string {
  const data = ts + apiKeyPrivate + apiKeyPublic;
  return crypto.createHash("md5").update(data).digest("hex");
}

export const getCharacters = async (): Promise<CharactersData> => {
  try {
    const ts = new Date().getTime().toString();
    const hash = generateHash(ts);

    const response = await axios.get<CharactersData>(
      `${process.env.MARVEL_PUBLIC_URl}/characters?ts=${ts}&apikey=${apiKeyPublic}&hash=${hash}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching characters: ", error);
    throw error;
  }
};

export const getErrorsLoginUser = (code: string) => {
    const errorsLogin: Record<string, string> = {
    INVALID_LOGIN_CREDENTIALS: "Credenciales invalidas",
    INVALID_EMAIL: "Email invalido"
    };
    return errorsLogin[code] || "Error no encontrado";
};

export function getErrorCreateUser (code: string): string {
    const errorsAuthCreate: Record<string, string> = {
      'auth/email-already-exists': 'Email usado en otra cuenta',
      'auth/invalid-password': 'La contraseña debe ser una cadena con al menos 6 caracteres.'
    };
    return errorsAuthCreate[code] || (code ?? 'Error no encontrado');
};
