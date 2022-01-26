/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');

const { check } = require('express-validator');

const { getUsuarios,crearUsuario,actualizarUsuario,eliminarUsuario } = require('../controllers/usuarios');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();



router.get('/',validarJWT,getUsuarios);

router.post('/',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password', 'El passwor es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos


    ],crearUsuario);

 router.put('/:id',
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),        
        check('email','El email es obligatorio').isEmail(),
        check('role','El rol es obligatorio').not().isEmpty(),
        validarCampos
    ],actualizarUsuario);

router.delete('/:id',validarJWT,eliminarUsuario);






module.exports = router;