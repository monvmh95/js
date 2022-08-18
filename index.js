import  express  from 'express';
import router from './routes/index.js';
import db from './config/db.js';



const app = express();

//coenctar la base de datos
db.authenticate()
    .then(()=> console.log('Base de datos conectada'))
    .catch(error => console.log(error))

//Definir puerto
const port = process.env.PORT || 4000;

//habilitar pug
app.set('view engine', 'pug');

//obtener fecha actual
app.use((req, resp, next)=>{

    const year = new Date();

    resp.locals.actualYear=year.getFullYear();

    next();

})

//agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));


//Definir la carpeta publica
app.use(express.static('public'));
app.use('/viajes', express.static('public'));


//agregar router
app.use('/', router);



app.listen(port, () =>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})

