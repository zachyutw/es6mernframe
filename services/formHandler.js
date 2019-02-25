import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import multipart from 'connect-multiparty';
import FormData from 'form-data';
import _ from 'lodash';
import objectToFormData from 'object-to-formdata';


const streamFormDataFile = (formData,fileKey,file)=>{
    const { path: filePath, originalFilename } = file;
    
        const newPath = path.join(path.dirname(filePath), originalFilename);
        fs.rename(filePath,newPath, (err)=>{
            if(err){
                console.log(err,"err");
                return
            }
            else{
                console.log(formData);
                const file = fs.createReadStream(newPath);
                formData.append("123",file);
                console.log(formData);
                return formData;
            }
        });
}
const formHandler   = (req,res,next )=>{
    // console.log(req.body);
    // console.log(req.files);
    const bodyKeys = _.keys(req.body);
    let formData = new FormData();
    // bodyKeys.map( (key)=> { formData.append(key,req.body[`${key}`])});
    //? handle multi files
    const fileKey = "images";
    if( _.isArray(req.files[`${fileKey}`])){
        req.files[`${fileKey}`].map( (readFile)=> {
            formData = streamFormDataFile(formData,fileKey,readFile) || formData;
        } )
    }
    else{
        const readFile = req.files[`${fileKey}`];
        formData = streamFormDataFile(formData,fileKey,readFile) || formData;
    
    }

    req.form = formData;
    return next();
}
export const multipartMiddleware = multipart();
export default formHandler;