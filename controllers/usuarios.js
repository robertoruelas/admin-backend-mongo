const { response } = require('express');
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

//Obtener usuarios
const getUsuarios = async (req, res = response) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok: true,        
        usuarios
    });
    
}

const eliminarUsuario = async (req,res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id...'

            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'El usuario se a eliminado correctamente...'
        });
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado ... '
        });

    }

}


// Crear usuarios
const crearUsuario = async (req, res = response) => {
 const {email, password, nombre } = req.body;

 try {

    const existeEmail =  await Usuario.findOne({email});
    // console.log(existeEmail);
    if(existeEmail){
        return res.status(400).json({
            ok: false,
            msg: 'El Email ya existe...',
        });
    }

    const usuario = new Usuario(req.body);
 
    //Crifrar password
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar el usuario
    await usuario.save();

    // Generar el token
    const token = await generarJWT(usuario.id);
   
       res.json({
           ok: true,
           usuario,
           token
          
       });
       
 } catch (error) {
     res.status(500).json({
         ok: false,
         msg: 'Error inesperado .... revisar logs'
     });
 }
 
}


 const actualizarUsuario = async (req,res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);
        
        const {password,google,email, ...campos} = req.body;

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id...'

            });
        }

        if(usuarioDB.email !== email){
         
            const existeEmail = await Usuario.findOne({ email });
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'El email ya existe...'
                });
            }
        }

        campos.email = email;
        // Actualizacion       

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
        
    }

 }


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}