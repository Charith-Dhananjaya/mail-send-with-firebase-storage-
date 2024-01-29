import express from "express";
import * as mailController from "../Controllers/incidentMailController.js"
import upload from "../Configs/configMulter.js";
import { firebaseConfig } from "../Configs/Firebase.js";
const router = express.Router();



router.post('/sendEmail',upload.single('history'), mailController.sendEmail);


export default router;