import { useState, useEffect } from "react";


const Contador = () => {
  const [contador, setContador] = useState(0);
  const [modoRegresivo, setModoRegresivo] = useState(false);
  const [inputValor, setInputValor] = useState("");
  const [activo, setActivo] = useState(true); 

  useEffect(() => {
    if (!activo) return;

    const interval = setInterval(() => {
      setContador((prev) => {
        if (modoRegresivo) {
          return prev > 0 ? prev - 1 : 0;
        } else {
          return prev < 999999 ? prev + 1 : 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [modoRegresivo, activo]);

 
  const numeroFormateado = String(contador).padStart(6, "0").split("");

  const manejarCambio = (e) => {
    setInputValor(e.target.value);
  };

  const iniciarCuentaRegresiva = () => {
    const numero = parseInt(inputValor, 10);
    if (!isNaN(numero) && numero >= 0 && numero <= 999999) {
      setContador(numero);
      setModoRegresivo(true);
      setActivo(true);
    }
  };

  const reiniciarContador = () => {
    setContador(0);
    setModoRegresivo(false);
    setActivo(true);
  };

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
        <button onClick={() => { setModoRegresivo(false); setActivo(true); }}>Cuenta Progresiva</button>
        <button onClick={() => { setModoRegresivo(true); setActivo(true); }}>Cuenta Regresiva</button>
        <input
          type="number"
          placeholder="Número inicial"
          value={inputValor}
          onChange={manejarCambio}
          min="0"
          max="999999"
        />
        <button onClick={iniciarCuentaRegresiva}>Iniciar Regresiva</button>
        <button onClick={() => setActivo(!activo)}>{activo ? "Pausar" : "Reanudar"}</button>
        <button onClick={reiniciarContador}>Reiniciar</button>
      </div>
    </div>
  );
};

export default function App() {
  return <Contador />;
}