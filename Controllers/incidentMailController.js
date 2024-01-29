import * as mailService from "../Services/incidentMailService.js";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const sendEmail = async (req, res) => {
    if (!req.body || !req.file) {
        return res.status(400).json({ error: "Data is missing in the request body", status: false });
    }

    const { from, to, subject, text, html } = req.body;
    const filename = req.file.originalname; 
    const storage = getStorage();
    const storageRef = ref(storage, `history/${filename}`);
    
    try {
      
        await uploadBytes(storageRef, req.file.buffer);

        const downloadURL = await getDownloadURL(storageRef);

        
        await mailService.sendEmail(from, to, subject, text, html, filename, downloadURL);

        res.status(200).json({ message: "Email sent successfully", status: true });
    } catch (error) {
        console.error("Error in sending email:", error);
        res.status(500).json({ error: "Internal Server Error", status: false });
    }
};
