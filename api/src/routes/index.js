const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const { API_KEY } = process.env;
const express = require('express');
const axios = require('axios');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


let urLink = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`


const getApiData = async() => {
    
    const apiData = await axios.get(urLink);
    const apiInfo = await apiData.data.map(el => {
    let temperamentArray = [];
    if (el.temperament) {//pregunto que exista el temperamento y lo devuelvo en un arreglo
        temperamentArray = el.temperament.split(", ");
    }
    
    let heightArray = [];
    if (el.height.metric) {
        heightArray = el.height.metric.split(" - ");
    }
    let weightArray = [];
    if (el.weight.metric) {
        weightArray = el.weight.metric.split(" - ");
    }
        return {
            id: el.id,
            name: el.name,
            height: heightArray,
            weight: weightArray,
            temperaments: temperamentArray,
            life_span: el.life_span,
            image: el.image.url,
        }
    })
return apiInfo;
}
//-- Get data from the database posgrest--//
const getFromDb = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'], //atributos que quiero traer del modelo Temperament, el id lo trae automatico
            through: {
                attributes: [],//traer mediante los atributos del modelo
            },
        }
    })
};

//combine data from API and database
const getAllDogs = async () => {
    const dataFromApi = await getApiData();
    const dataFromDb = await getFromDb();
    // const allDataMixed = dataFromApi.concat(dataFromDb);
    const allDataMixed = [...dataFromApi, ...dataFromDb];
    return allDataMixed;
}





//!--endpoints--//


//* Ruta que me traigo Todos */
router.get("/dogs", async(req, res) => {//esta funcion también podra recibir un nombre por medio de query
    // const name = req.query.name;
    const { name } = req.query;
    const allDogs = await getAllDogs();
    if (name) {
        const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));//si el perro existe guardame sus parametros aca.
        dog.length ? res.status(200).send(dog) : res.status(200).send("No se encontro raza de perros"); 
    } else {
        res.status(200).send(allDogs);
    }
});


//** Ruta para el Id */

router.get("/dogs/:idRaza", async(req, res) => {//traer la info de un perro por su id, del modelo raza
    const { idRaza } = req.params;
    const allDogs = await getAllDogs();
    const dog = allDogs.filter(el => el.id == idRaza);
    if (dog.length) {
        res.status(200).json(dog);
    }else{
        res.status(404).send("Dog no found in the Data");
    }
});


//** Ruta que Me traigo los Temperamentos */

router.get("/temperament", async (req, res) => {
    const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const temperaments = temperamentsApi.data.map(t => t.temperament);
    const temps = temperaments.toString().split(",");
    temps.forEach(el => {
        let i = el.trim()
        Temperament.findOrCreate({
             where: { name: i }
        })
    })

    const allTemp = await Temperament.findAll();    
    res.send(allTemp);
});



//** Ruta de Creacion */

router.post("/dog", async (req, res) => {
    let {
     name,
     min_height,
     max_height,
     min_weight,
     max_weight,
     life_span,
     temperaments,
     image,
    createdInDb
    
    } = req.body
 
    const fixedHeight = []
    const minHeight = min_height;
    const maxHeight = max_height;
    fixedHeight.push(minHeight, maxHeight)
 
    const fixedWeight = []
    const minWeight = min_weight;
    const maxWeight = max_weight;
    fixedWeight.push(minWeight, maxWeight)
 
    let dog = await Dog.create({
     name,
     height: fixedHeight,
     weight: fixedWeight,
     life_span,
     image: image ? image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj0GSChc9hkoJSDWABu0Mne3Dyj9JBUqFv9oHRqsgkjR36Tf81KcELxwYh1hhHT4qzyrg&usqp=CAU",
     createdInDb
    })
 
    let associatedTemp = await Temperament.findAll({
        where: { id: temperaments},
    })
 
    dog.addTemperament(associatedTemp);
 
    res.status(200).send("El Dog se creo Correctamente!")
})

router.use(express.json());


//** Error 404*/
 
router.put('*',(_req,res) => {
    res.status(404).send("no se encontro la pagina")
})


//** Ruta delete prueba beta */

router.delete("/dogs/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      Dog.destroy({ where: { id: id } });
      res.status(200).send("El Dog se elimino Correctamente!")
    } catch (err) {
      next(err);
    }})



//**ruta put */

/*
 router.put('put/:id',async (req,res)=>{
    const{id} = req.params 
    const {
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span,
        temperaments,
        image
    }=req.body


    try {
        await Dog.update ({
            name: name,
        min_height:min_height,
        max_height:max_height,
        min_weight:min_weight,
        max_weight:max_weight,
        life_span:life_span,
        image:image
        
                },
        {
            where:{
                id:id,
            },
        }

        );
        return res.status(200).send("Modificacion realizada en Dogs")
    } catch (error){
        res.status(404).send("No se Actualizo")
    }



    })
*/








 
 




 
module.exports = router;
