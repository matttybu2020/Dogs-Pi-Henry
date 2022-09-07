import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemperaments, postCrearDog } from "../../redux/Action/index";

import  "./CrearDog.css"


const validate = (form) => {
    let errors = {}
    if(!form.name) {
        errors.name = "Name is required, it should not contain numbers"
    }
    if(!form.min_height || !form.max_height) {
        errors.height = "Height is required"
    }
    if(!form.min_weight || !form.max_weight) {
        errors.weight = "Weight is required"
    }
    if(!form.life_span) {
        errors.life_span = "Lifespan is required, type only numbers separated by a dash (-)"
    }
    if (form.temperaments.length === 0) {
        errors.temperaments = "Add at least one temperament";
      }
    return errors
}

export default function CrearDog() {
    
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);

    const [button, setButton] = useState(true);
    const [errors, setErrors] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span:  "",
        image: "",
    });

    const [form, setForm] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span:  "",
        image: "",
        temperaments: [],
    })

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    useEffect(()=>{
        if (form.name.length > 0 && form.min_height.length > 0  && form.max_height.length > 0 && form.min_weight.length > 0 && form.max_weight.length > 0) setButton(false)
        else setButton(true)
    }, [form, setButton]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postCrearDog(form));
        alert("The new dog was added successfully");
        setForm({
            name: "",
            min_height: "",
            max_height: "",
            min_weight: "",
            max_weight: "",
            life_span: "",
            image: "",
            temperaments: []
        });
    }
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value //el valor del atributo modificado del estado en el form se actualizara con lo escrito en dicho campo
        });
        setErrors(validate({
            ...form,
            [e.target.name] : e.target.value
        }))
    }
    
    const handleSelect = (e) => {
        
        setForm({
            ...form,
            temperaments: [...form.temperaments, e.target.value]
        })
    }

    /*const  handleSelect = (e) => {
        if (form.temperaments.includes(parseInt(e.target.value))) {
          alert("Ya seleccionaste este temperamento");
        } else {
            setForm((prev)=> ({
            ...prev,
            temperaments: [...prev.temperaments, parseInt(e.target.value)],
          }));
        }
        setErrors(validate({ ...form, [e.target.name]: e.target.value }));
      }*/




    const handleDelete = (el) => {
       
        setForm({
            ...form,
            temperaments: form.temperaments.filter(temp => temp !== el)
        })
    }

  
    







    return(
        <div className="main_wrapper">
            <div className="container">
                <Link to="/dogs">
                    <button className="button_to_home">Go home</button>
                </Link>
                <ul>
                <div className="label">
                <h3>Create Dog</h3>
                </div>
                <form action="" id="form" onSubmit={handleSubmit} className="form">
                    <div className="name_container">
                    <div className="label">
                    <li>
                   
              <label>Name:</label>
            </li>
            </div>
                        <input autoFocus className="input_name" type="text" value={form.name} name="name" onChange={(e) => handleChange(e)} placeholder=""/>
                    </div>
                    <div className="error_form">{errors.name && <p>{errors.name}</p>}</div> {/*mesaje ed error de nombre*/}

                    <div className="height_container">
                        <div className="min_height">
                        <div className="label">
                        <li>
              <label>Height min:</label>
            </li>
            </div>
                            <input type="label" value={form.min_height} name="min_height" placeholder="" onChange={(e) => handleChange(e)}/>
                        </div>
                        
                        <div className="max_height">
                        <div className="label">
                        <li>
              <label>Height max:</label>
            </li>
            </div>
                    
                            <input type="text" value={form.max_height} name="max_height" placeholder="" onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
                    <div className="error_form">{errors.height && <p>{errors.height}</p>}</div>{/* espacio para agregar error */}{/* espacio para agregar error */}

                    <div className="weight_container">
                        <div className="min_weight">
                        <div className="label">
                        <li>
              <label>Weight min:</label>
            </li>
            </div>
                            <input type="text" value={form.min_weight} name="min_weight" placeholder="" onChange={(e) => handleChange(e)}/>
                        </div>

                        <div className="max_weight">
                        <div className="label">
                        <li>
              <label>Weight max:</label>
            </li>
            </div>
                            <input type="text" value={form.max_weight} name="max_weight" placeholder="" onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
                    <div className="error_form">{errors.weight && <p>{errors.weight}</p>}</div>{/* espacio para agregar error */}

                    <div className="life-span-container">
                    <div className="label">
                    <li>
              <label>life-span:</label>
            </li>
            </div>
                        <input type="text" autoComplete="off" name="life_span" value={form.life_span} placeholder="" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className="error_form">{errors.life_span && <p>{errors.life_span}</p>}</div>{/* espacio para agregar error */}

                    <div className="image-container">
                    <div className="label">
                    <li>
              <label>image:</label>
            </li>
            </div>
                        <input type="text" autoComplete="off" value={form.image} name="image" placeholder="" onChange={(e) => handleChange(e)}/>
                    </div>

                    <div className={""}>
                        <h3>Select Temperaments</h3>
                    </div>

                    <div className={""}>
                        <select className="select_temperaments" onChange={handleSelect} >
                            <option disabled selected>Temperaments</option>
                            {temperaments.map(d => (                    
                                <option value={d.name} key={d.name+Math.random()} className="option_temperament">{d.name}</option> //key de elementos de temperamentos, eliminar el repetido reserved
                            ))}
                        </select>
                    </div>

                    <div className="container_button_add_dog">
                        <button className="button_add_dog" disabled={button} type="submit" form="form">Create Dog</button>
                    </div>
                </form>

            

                <div className="">
                    <div className="">
                        <h2>Temperaments</h2>
                    </div>

                    <div className="container_temperaments">
                        {form.temperaments.map(el => 
                        <div className="element_temperament" key={el} onClick={() => handleDelete(el)}>
                            <p>{`${el}`}</p>
                           
           
        
                        </div>    
                        )}
                    </div>
                </div>
                </ul>
            </div>
        </div>
    )
}
