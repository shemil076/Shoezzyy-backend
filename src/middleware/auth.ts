import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


export const auth = (req: Request, res: Response, next: NextFunction) =>{
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({message:'No token, authorization denied'});
    }

    try{
        const jwtSecret = 'shoe.zzyy_dev_env_jwt_secret';
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }
        const decoded = jwt.verify(token, jwtSecret);
        req.body.user = decoded;
        next();
    }catch(error){
        res.status(401).json({message : 'Token is not valid'});
    }
};

export const adminAuth = (req : Request, res : Response, next : NextFunction)=>{
    auth(req, res,()=>{
        if(req.body.user.role !== 'admin'){
            return res.status(403).json({message:"Access Denied"});
        }
        next();
    });
};