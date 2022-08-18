import { Viaje } from "../models/Viajes.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio =  async (req, res) =>{ //req lo que enviamos y rest lo que recibimos

    //consultar 3 viajes del modelo viaje

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimonial.findAll({limit: 3}));


    try {
 
        const resultado = await Promise.all(promiseDB)

        res.render('inicio', {
            pagina: "Inicio", 
            clase: "home",
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
        
    } catch (error) {
        console.log(error)
        
    }


}

const paginaNosotros = (req, res) =>{
    res.render('nosotros', {
        pagina: "Nosotros"
    });
}

const paginaTestimoniales = async (req, res) =>{

    try {

        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales',{
            pagina:"Testimoniales",
            testimoniales
        });
        
    } catch (error) {
        console.log(error)
    }

}

const paginaViajes = async (req, res) =>{
    //consultar BD
    const viajes = await Viaje.findAll()

    //console.log(viajes)

    res.render('viajes',{
        pagina:"Proximos Viajes",
        viajes
    });
}

//Mostrar viaje por slug

const paginaDetalleViaje = async (req, res) =>{

    console.log(req.params)

    const {slug} = req.params;

    try {
        const viaje = await Viaje.findOne({where: {slug}})

        res.render('viaje',{
            pagina: 'Informacion de Viaje',
            viaje
        })
    } catch (error) {
        console.log(error)
        
    }

}




export {
    paginaInicio,
    paginaNosotros,
    paginaTestimoniales,
    paginaViajes,
    paginaDetalleViaje
}