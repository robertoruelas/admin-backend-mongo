const {response} = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req,res = response, next) => {
    //Leer el token
    const token = req.header('x-token');

     //console.log(token);
     if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token el la petición'
        });

     }

     try {

        const { uid } = jwt.verify(token,process.env.JWT_SECRET);

        req.uid = uid;
        // console.log(uid);
        next();

     } catch (error) {
         res.status(401).json({
             ok: false,
             msg: 'Token no valido'
         });
     }


}


module.exports = {
    validarJWT
}