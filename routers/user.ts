import Router from "express";
import {UserRecord} from "../records/user.record";
import {CreateUserReq} from "../types";

export const userRouter = Router()

userRouter
    .post('/login', async (req, res) => {
        const {email, password} = req.body
        console.log(req.body) // DLA SPRAWDZENIA
        const user = await UserRecord.getOne(email, password)
        console.log(user) // DLA SPRAWDZENIA
        res.json(user)
    })

    .post('/reg', async (req, res) => {
        const newUser = new UserRecord(req.body as CreateUserReq)
        await newUser.insert()

        res.json(newUser)
    })
    //
    // .delete('/del', async (req, res) => {
    //     const trade = new UserRecord.getOne()
    // })