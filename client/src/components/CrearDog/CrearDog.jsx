import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemperaments, postCrearDog } from "../../redux/Action/index";
import { useHistory } from "react-router-dom";
import "./CrearDog.css";

const validate = (form) => {
 //var ExpRegSoloNumeros="^[0-9]+$";
 // var ExpRegLetrasEspacio="^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";

  let errors = {};
  if (!form.name) {
    errors.name = "El nombre es obligatorio, no debe contener números";
  }

// var RegLetrasEspacio="^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";

 /* if (!form.name) {
    errors.name = "El nombre es obligatorio";
  } else if (RegLetrasEspacio.test(form.name)) {
    errors.name = "no puede ingresar atributos";
  }
*/

  if (!form.min_height || !form.max_height) {
    errors.height = "Se requiere altura";
  }

  if (!form.min_weight || !form.max_weight) {
    errors.weight = "Se requiere peso";
  }

if (!form.min_height) {
  errors.min_height = "Height is required";
} else if (!/\d{1,2}-\d{1,2}/g.test(form.min_height)) {
  errors.min_height = "Add a height range. Example: '10-12'";
}
if (!form.max_height) {
  errors.max_height= "Height is required";
} else if (!/\d{1,2}-\d{1,2}/g.test(form.max_height)) {
  errors.max_height= "Add a height range. Example: '10-12'";
}
if (!form.min_weight) {
  errors.min_weight = "min_weight is required";
} else if (!/\d{1,2}-\d{1,2}/g.test(form.min_weight)) {
  errors.min_weight = "Add a min_weight range. Example: '10-12'";
}

if (!form.max_weight) {
  errors.max_weight = "max_weight is required";
} else if (!/\d{1,2}-\d{1,2}/g.test(form.max_weight)) {
  errors.max_weight = "Add a max_weight range. Example: '10-12'";
}


 /* if (!form.life_span) {
    errors.life_span =
      "tiempo de vida es requerido";
  }
*/
  if (!form.life_span) {
    errors.life_span= "Ingrese valor de Promedio de vida";
  } else if (!/^[1-20]$/.test(form.life_span)) {
    errors.life_span= "EL valor de vida promedio no puede ser mayor a 20";
  }
 


  if (form.temperaments.length === 0 ) {
    errors.temperaments = "Añade al menos un temperamento";
  }
    return errors;
};

export default function CrearDog() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const history = useHistory();

  const [button, setButton] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_span: "",
    image: "",
  });

  const [form, setForm] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  useEffect(() => {
    if (
      form.name.length > 0 &&
      form.min_height.length > 0 &&
      form.max_height.length > 0 &&
      form.min_weight.length > 0 &&
      form.max_weight.length > 0
    )
      setButton(false);
    else setButton(true);
  }, [form, setButton]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(postCrearDog(form));
    alert("EL dog se creo Correctamente");
    setForm({
      name: "",
      min_height: "",
      max_height: "",
      min_weight: "",
      max_weight: "",
      life_span: "",
      image: "",
      temperaments: [],
    });
    history.push("/dogs")
  };

 
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, //el valor del atributo modificado del estado en el form se actualizara con lo escrito en dicho campo
    });
    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  };

  /*const handleSelect = (e) => {
        
        setForm({
            ...form,
            temperaments: [...form.temperaments, e.target.value]
        })
    }*/

  /*Controlo que no seleccione un temperament ya seleccionado, hago una copia de los seleccionado y agrego uno nuevo*/
  function handleSelect(e) {
    if (form.temperaments.includes(parseInt(e.target.value))) {
      alert("Temperamento ya ingresado");
    } else {
      setForm((prev) => ({
        ...prev,
        temperaments: [...prev.temperaments, parseInt(e.target.value)],
      }));
    }
    setErrors(validate({ ...form, [e.target.name]: e.target.value }));
  }

  /*pusheo a names, los nombres de temperament donde tempss.id === select.id*/
  const tempsNames = (array) => {
    let names = [];
    temperaments?.forEach((e) =>
      array.forEach((id) => {
        if (parseInt(id) === e.id ) {
          names.push(e.name);
        }
      })
      );
    console.log(names)
    return names;
  };
 // temperaments: [curious,adventure,active]
  const handleDelete = (el) => {
    setForm({
      ...form,
      temperaments: form.temperaments.filter((temp) => temp !== el),
    });
  };

  return (
    <div className="background4">
    <div className="main_wrapper">
      <div className="container">
        <div>
          <Link to="/dogs">
            <button className="button_to_home">Go home</button>
          </Link>
        </div>

        <ul>
          <div className="label">
            <h3>Cear Perro</h3>
          </div>
          <br />
          <form action="" id="form" onSubmit={handleSubmit} className="form">
            <div className="name_container">
              <div className="label">
                <li>
                  <label>Nombre:</label>
                </li>
              </div>
              <input
                autoFocus
                className="input_name"
                type="text"
                value={form.name}
                name="name"
                onChange={(e) => handleChange(e)}
                placeholder=""
              />
            </div>
            <div className="error_form">
              {errors.name && <p>{errors.name}</p>}
            </div>{" "}
            {/*mesaje ed error de nombre*/}
            <div className="height_container">
              <div className="min_height">
                <div className="label">
                  <li>
                    <label>Altura mín.:</label>
                  </li>
                </div>
                <input
                  type="label"
                  value={form.min_height}
                  name="min_height"
                  placeholder=""
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="max_height">
                <div className="label">
                  <li>
                    <label>Altura máx:</label>
                  </li>
                </div>

                <input
                  type="text"
                  value={form.max_height}
                  name="max_height"
                  placeholder=""
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="error_form">
              {errors.height && <p>{errors.height}</p>}
            </div>
            {/* espacio para agregar error */}
            {/* espacio para agregar error */}
            <div className="weight_container">
              <div className="min_weight">
                <div className="label">
                  <li>
                    <label>Peso mínimo:</label>
                  </li>
                </div>
                <input
                  type="text"
                  value={form.min_weight}
                  name="min_weight"
                  placeholder=""
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="max_weight">
                <div className="label">
                  <li>
                    <label>Peso máximo:</label>
                  </li>
                </div>
                <input
                  type="text"
                  value={form.max_weight}
                  name="max_weight"
                  placeholder=""
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="error_form">
              {errors.weight && <p>{errors.weight}</p>}
            </div>
            {/* espacio para agregar error */}
            <div className="life-span-container">
              <div className="label">
                <li>
                  <label>esperanza de vida:</label>
                </li>
              </div>
              <input
                type="text"
                autoComplete="off"
                name="life_span"
                value={form.life_span}
                placeholder=""
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="error_form">
              {errors.life_span && <p>{errors.life_span}</p>}
            </div>
            {/* espacio para agregar error */}
            <div className="image-container">
              <div className="label">
                <li>
                  <label>URL de la imagen:</label>
                </li>
              </div>
              <input
                type="text"
                autoComplete="off"
                value={form.image}
                name="image"
                placeholder=""
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={""}>
              <h3>Seleccione Temperamentos</h3>
            </div>
            <div className={""}>
              <select
                className="select_temperaments"
                onChange={handleSelect}
                key="temperaments"
                value={form.temperaments}
                name="temperaments"
              >
                <option >
                  Temperaments
                </option>
                {temperaments?.map(d => (
                  <option
                    value={d.id}
                    key={d.id}
                    className="option_temperament"
                  >
                    {d.name}
                  </option> //key de elementos de temperamentos, eliminar el repetido reserved
                ))}
              </select>
              {errors.temperaments && (
                <p className="danger">{errors.temperaments}</p>
              )}
              <br />

              {/*cada temperament que selecciono lo agrego abajo y puedo seleccionar uno nuevo*/}
              {form.temperaments.map((e) => (
                <p id={e}>{tempsNames([e])}</p>
              ))}
            </div>
            <div className="container_button_add_dog">
              <button
                className="button_add_dog"

                disabled={button}
                type="submit"
                form="form"
              >
                Create Dog
              </button>
            </div>
          </form>

          <div className="">
            <div className="">
              <h2>Temperaments</h2>
            </div>

            <div className="container_temperaments">
              {form.temperaments.map((el) => (
                <div
                  className="element_temperament"
                  key={el}
                  onClick={() => handleDelete(el)}
                >
                  <p>{`${el}`}</p>
                </div>
              ))}
            </div>
          </div>
        </ul>
      </div>
    </div>
    </div>
  );
}
