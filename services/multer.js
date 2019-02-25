import multer from 'multer';
const ImagesStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/upload/images');
    },
    filename:(req,file,cb)=>{
        const names = file.originalname.toLowerCase().split('.');
        const extension = names[names.length-1];
        const fileName = Buffer.from(Date.now()+'-'+names[0]).toString('base64')+"."+extension;  
        cb(null,fileName);
    }
});

const imageFileFilter =(req, file, cb)=> {
    const names = file.originalname.toLowerCase().split('.');
    const extension = names[names.length-1];
    const whiteList = ["jpg","png","jpeg"];
    const found = whiteList.findIndex((item)=>item===extension);
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    // To reject this file pass `false`, like so:
    if(found!==0){
        return cb(null, false)
    }
    else if(found===0){
        return cb(null, true)
    }
    else{
        return cb(new Error('I don\'t have a clue!'))
    }
    // To accept the file pass `true`, like so:
    
    // You can always pass an error if something goes wrong:
}

const filesStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/upload/images');
    },
    filename:(req,file,cb)=>{
        const names = file.originalname.toLowerCase().split('.');
        const extension = names[names.length-1];
        const fileName = Buffer.from(Date.now()+'-'+names[0]).toString('base64')+"."+extension;  
        cb(null,fileName);
    }
});

export const ImagesUpload = multer({storage:ImagesStorage,imageFileFilter});
export const fileUpload = multer({storage:filesStorage});
