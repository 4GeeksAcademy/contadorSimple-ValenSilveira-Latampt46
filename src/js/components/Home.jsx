import React, { Component } from "react";

class Contador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contador: 0,
      modoRegresivo: false,
      inputValor: "",
      activo: true,
    };
    this.interval = null;
  }

  componentDidMount() {
    this.iniciarIntervalo();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.modoRegresivo !== prevState.modoRegresivo || this.state.activo !== prevState.activo) {
      this.iniciarIntervalo();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  iniciarIntervalo = () => {
    clearInterval(this.interval); // Limpiar intervalo anterior

    if (!this.state.activo) return;

    this.interval = setInterval(() => {
      this.setState((prevState) => {
        let nuevoContador;
        if (prevState.modoRegresivo) {
          nuevoContador = prevState.contador > 0 ? prevState.contador - 1 : 0;
        } else {
          nuevoContador = prevState.contador < 999999 ? prevState.contador + 1 : 0;
        }
        return { contador: nuevoContador };
      });
    }, 1000);
  };

  manejarCambio = (e) => {
    this.setState({ inputValor: e.target.value });
  };

  iniciarCuentaRegresiva = () => {
    const numero = parseInt(this.state.inputValor, 10);
    if (!isNaN(numero) && numero >= 0 && numero <= 999999) {
      this.setState({ contador: numero, modoRegresivo: true, activo: true }, this.iniciarIntervalo);
    }
  };

  reiniciarContador = () => {
    this.setState({ contador: 0, modoRegresivo: false, activo: true }, this.iniciarIntervalo);
  };

  toggleActivo = () => {
    this.setState((prevState) => ({ activo: !prevState.activo }), this.iniciarIntervalo);
  };

  render() {
    const numeroFormateado = String(this.state.contador).padStart(6, "0").split("");

    return (
      <div className="contador-container">
        <div className="contador">
          <span className="icono">🕒</span>
          {numeroFormateado.map((num, index) => (
            <span key={index} className="digito">
              {num}
            </span>
          ))}
        </div>
        <div className="controles">
          <button onClick={() => this.setState({ modoRegresivo: false, activo: true }, this.iniciarIntervalo)}>
            Cuenta Progresiva
          </button>
          <button onClick={() => this.setState({ modoRegresivo: true, activo: true }, this.iniciarIntervalo)}>
            Cuenta Regresiva
          </button>
          <input
            type="number"
            placeholder="Número inicial"
            value={this.state.inputValor}
            onChange={this.manejarCambio}
            min="0"
            max="999999"
          />
          <button onClick={this.iniciarCuentaRegresiva}>Iniciar Regresiva</button>
          <button onClick={this.toggleActivo}>{this.state.activo ? "Pausar" : "Reanudar"}</button>
          <button onClick={this.reiniciarContador}>Reiniciar</button>
        </div>
      </div>
    );
  }
}

export default function App() {
  return <Contador />;
}