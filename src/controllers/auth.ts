import { type Request, type Response } from "express";
import { sdkAdmin } from "../firebase";
import axios from "axios";
import { getErrorCreateUser, getErrorsLoginUser } from "../helper";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const userQuery = await sdkAdmin.firestore()
            .collection("Users")
            .where("email", "==", email)
            .limit(1)
            .get();

        const userData = userQuery.docs.map((doc) => {
            const data = doc.data();
            return { ...data, documentId: doc.id };
        })

        if (userData.length === 0) throw "Unregistered user";

        const { data } = await axios.post(
            `${process.env.BASE_URL_IG}/accounts:signInWithPassword?key=${process.env.FIREBASE_API_WEB}`,
            {
                email,
                password,
                returnSecureToken: true,
            }
        );

        res.status(200).json({  uid: data.localId, ...userData[0] })
    } catch (error: any) {
        console.log(error);
        
        const errorInfo = getErrorsLoginUser(error?.response?.data?.error?.message);
        res.status(400).json({ msg: `${errorInfo || "An unexpected error occurred"}` });
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        if (!(email && password && name)) return res.status(400).json({ msg: "Params not found" });

        const newUser = await sdkAdmin.auth().createUser({
            email,
            password,
        });

        const uid = newUser.uid;

        await sdkAdmin.firestore().collection("Users").add({
            uid,
            email,
            createdAt: new Date(),
            name
        })

        res.status(200).json({ msg: "User created successfully", uid })
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ msg: `${getErrorCreateUser(error?.errorInfo?.code ?? error)}` })
    }
}   