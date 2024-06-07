import { type Request, type Response } from "express";
import { sdkAdmin } from "../firebase";

export const create = async (req: Request, res: Response) => {
  const { email, name } = req.body;
  try {
    if (!email || !name) throw "Params not found";

    await sdkAdmin.firestore().collection("Solicitud").add({
      email,
      nameComic: name,
    });

    res.status(200).json({ msg: "Solicitud enviada correctamente" });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};
