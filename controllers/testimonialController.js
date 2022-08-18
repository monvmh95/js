import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial =async (req, resp) => {

    //console.log(req.body);

    //validar...

    const { nombre, correo, mensaje} = req.body;

    const errores = []

    if (nombre.trim()==='') {
        errores.push({mensaje : 'El nombre esta vacio'});
    }
    if (correo.trim()==='') {
        errores.push({mensaje: 'El correo esta vacio'});
    }
    if (mensaje.trim()==='') {
        errores.push({mensaje: 'El mensaje esta vacio'});
    }

    console.log(errores);

    if (errores.length > 0) {

        //consultar testimoniales
        const testimoniales = await Testimonial.findAll();
        
        //Mostrar vista con errores
        resp.render('testimoniales', {
            pagina:"Testimoniales",
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
        
    }
    else{
        //almacenar en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            })
            
            resp.redirect('testimoniales')
            
        } catch (error) {
            console.log(error);
        }
    }




    
}


export {
    guardarTestimonial
}