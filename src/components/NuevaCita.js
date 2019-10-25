import React, { Component } from 'react';
import PropTypes from 'prop-types';

import uuid from 'uuid';

const initialState = {
  cita: {
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  },
  error: false
};

class NuevaCita extends Component {
  state = {
    cita: {
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    },
    error: false
  };

  handleChange = e => {
    e.persist();
    this.setState(prevState => ({
      cita: {
        ...prevState.cita,
        [e.target.name]: e.target.value
      }
    }));
  };

  handleSubmit = e => {
    e.preventDefault();

    if (Object.values(this.state.cita).some(item => item === '')) {
      this.setState({ error: true });
      return;
    }

    const nuevaCita = { ...this.state.cita };
    nuevaCita.id = uuid.v4();

    this.props.crearNuevaCita(nuevaCita);

    this.setState({ ...initialState });
  };

  render() {
    const { error } = this.state;

    return (
      <div className='card mt-5 py-3'>
        <div className='card-body'>
          <h2 className='card-title text-center mb-5'>
            Llena el formulario para crear nueva cita
          </h2>

          <form onSubmit={this.handleSubmit}>
            <div className='form-group row'>
              <label
                className='col-sm-4 col-lg-2 col-form-label'
                htmlFor='mascota'
              >
                Nombre mascota
              </label>
              <div className='col-sm-8 col-lg-10'>
                <input
                  id='mascota'
                  type='text'
                  className='form-control'
                  placeholder='Nombre de la mascota'
                  name='mascota'
                  onChange={this.handleChange}
                  value={this.state.cita.mascota}
                />
              </div>
            </div>
            <div className='form-group row'>
              <label
                className='col-sm-4 col-lg-2 col-form-label'
                htmlFor='propietario'
              >
                Nombre dueño
              </label>
              <div className='col-sm-8 col-lg-10'>
                <input
                  id='propietario'
                  type='text'
                  className='form-control'
                  placeholder='Nombre del dueño'
                  name='propietario'
                  onChange={this.handleChange}
                  value={this.state.cita.propietario}
                />
              </div>
            </div>
            <div className='form-group row'>
              <label
                className='col-sm-4 col-lg-2 col-form-label'
                htmlFor='fecha'
              >
                Fecha
              </label>
              <div className='col-sm-8 col-lg-4'>
                <input
                  id='fecha'
                  type='date'
                  className='form-control'
                  placeholder='Fecha cita'
                  name='fecha'
                  onChange={this.handleChange}
                  value={this.state.cita.fecha}
                />
              </div>
              <label
                className='col-sm-4 col-lg-2 col-form-label'
                htmlFor='hora'
              >
                Hora
              </label>
              <div className='col-sm-8 col-lg-4'>
                <input
                  id='hora'
                  type='time'
                  className='form-control'
                  placeholder='Hora cita'
                  name='hora'
                  onChange={this.handleChange}
                  value={this.state.cita.hora}
                />
              </div>
            </div>
            <div className='form-group row'>
              <label
                className='col-sm-4 col-lg-2 col-form-label'
                htmlFor='sintomas'
              >
                Síntomas
              </label>
              <div className='col-sm-8 col-lg-10'>
                <textarea
                  id='sintomas'
                  className='form-control'
                  placeholder='Describe los síntomas'
                  name='sintomas'
                  onChange={this.handleChange}
                  value={this.state.cita.sintomas}
                />
              </div>
            </div>

            {error && (
              <div className='alert alert-danger mt-2 mb-5 text-center'>
                Todos los campos son obligatorios.
              </div>
            )}
            <input
              type='submit'
              className='py-3 mt-5 btn btn-success btn-block'
              value='Agregar nueva cita'
            />
          </form>
        </div>
      </div>
    );
  }
}

NuevaCita.propTypes = {
  crearNuevaCita: PropTypes.func.isRequired
};

export default NuevaCita;
