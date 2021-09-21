import * as Yup from 'yup'
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import  User from "../entity/User";
import bcrypt from "bcrypt";
import * as nodemailer from "nodemailer"
import * as crypto from "crypto"

export const saveUser = async (request: Request, response: Response) => {

    const { name, email, password, } = request.body;
    try {
        const passwordHash = await bcrypt.hash(password, 8)
        const user =  getRepository(User).create({
            name,
            email,
            password: passwordHash,
        }) 
        await getRepository(User).save(user)
        return response.status(201).json(user);
    } catch (error) {
        return response.status(422).json({message: "error in entities!"+error})
    }
}




export const sessao = async (request: Request, response: Response) => {
    try{
        const { email, password, } = request.body;
        console.log(password, "body")
        const user =  getRepository(User).find({
            where: {
                email
            }
        }) 
        console.log(user, "getRepository ")
        if(await bcrypt.compare(password, user[0].password)){
            const data = {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
            }
            console.log(data, "data")
            return response.status(200).json(data);
        }
            return response.status(404).json({message: "User not found"});
        } catch (error) {
            return response.status(422).json({message: "error in entities!"+error})
    }
    
}



export const forgotPassword = async (request: Request, response: Response) => {
    const { email } = request.body;
    console.log(email, "body")

        const user =  getRepository(User).findOne({
            where: {
                email
            }
        })
        console.log((await user).email, "user email!")
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "luischimucomendes8@gmail.com",
                pass: "chimuco"
            }
        }) 
        console.log(transporter, "transport ")
        const newPasswor = crypto.randomBytes(4).toString("Hex")
        console.log(newPasswor, "neupassword")
        transporter.sendMail({
            from: "Administrador <luischimucomendes8@gmail.com>",
            to: email,
            subject: "Recuperação mde senha",
            text: `Olá, sua nova senha para acessar o sistema é : ${newPasswor}`
        }).then(
            () => {
                bcrypt.hash(newPasswor, 8).then(
                    password => {
                        getRepository(User).update(user[0].id, {
                            password
                        }).then(
                            () => {
                                return response.status(200).json({message: "Email send"})
                            }
                        ).catch(
                            () => {
                                return response.status(404).json({message: "User not found"})
                            }
                        )
                    }
                )
            }
        ).catch(
            () => {
                return response.status(404).json({message: "Fail to send E-mail."})
            }
        )

}


