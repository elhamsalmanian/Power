import {IncomingForm} from "Formidable";   
const fs = require("fs");
import userDataProvider from '../../provider/userDataProvider';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
        const data = await new Promise((resolve, reject) => {
            const form = new IncomingForm();
            form.parse(req, (err, fields, files) => {
                if (err) return reject(err);
                resolve({ fields, files });
            });
        });
        
        try {
            const userNmae = data.fields.name;
            const userId = data.fields.id;
            const imageFile = data.files.image; 

            const imagePath = imageFile.filepath;
            
            const pathToWriteImage = `public/images/usersImages/${userNmae}-${imageFile.originalFilename}`; // include name and .extention, you can get the name from data.files.image object
           
            const image = await fs.readFileSync(imagePath,(err) => { 
                if (err) {                     
                  console.log(err); 
                } 
              });
            
            await fs.writeFileSync(pathToWriteImage, image, (err) => { 
                if (err) { 
                  console.log(err); 
                } 
              });
            //store path in DB
            const user = userDataProvider.update(userId, { imgUrl: pathToWriteImage });
            
            res.status(200).json({ message: 'image uploaded!'});
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ message: error.message });
            return;
        }
        
    }
  } catch (error) {
    res.status(400).json({ message: JSON.stringify(error, null, 2) });
  }
}

