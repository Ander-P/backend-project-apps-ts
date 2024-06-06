import axios from "axios";
import * as crypto from "crypto";
import { CharactersData } from "../types";

const apiKeyPrivate = "1e6f6aafb423163832808170aacd3172cce2458a";
const apiKeyPublic = "b571ad3a936a82f38e38b1ebf7345910";

function generateHash(ts: string): string {
  const data = ts + apiKeyPrivate + apiKeyPublic;
  return crypto.createHash("md5").update(data).digest("hex");
}

export const getCharacters = async (): Promise<CharactersData> => {
  try {
    const ts = new Date().getTime().toString();
    const hash = generateHash(ts);

    const response = await axios.get<CharactersData>(
      `${process.env.MARVEL_PUBLIC_URL}/characters?ts=${ts}&apikey=${apiKeyPublic}&hash=${hash}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching characters: ", error);
    throw error;
  }
};
