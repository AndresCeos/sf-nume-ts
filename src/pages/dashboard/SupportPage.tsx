import bg from '@/assets/keys.png';
import { TiPlus } from 'react-icons/ti';

export default function SupportPage() {
  return (
    <div className="grid grid-cols-12 mx-14 gap-6 mt-8 pt-10 ">
      <div className="col-span-5 row-start-1 ">
        <h2 className="text-2xl text-main font-bold">¿Tienes un problema?</h2>
        <h2 className="text-2xl text-main ">Ponte en contacto con nosotros</h2>
      </div>
      <div className="col-span-7 mb-1 row-start-2 ">
        <div className="bg-black text-white text-base font-bold h-8 flex items-center justify-between rounded-tl-2xl rounded-tr-2xl">
          <div className="flex items-center ">
            <div className="w-9 h-9 flex justify-center items-center rounded-full -ml-3 mr-2 bg-secondary p-2">
              <TiPlus className="text-2xl" />
            </div>
            Herramientas de soporte
          </div>
        </div>
        <div className="pinnacle-wrap px-5 py-4  ">
          <div className="flex justify-between items-center">
            <a href="https://app.numerologia-cotidiana.com/formulario-de-soporte-arithmax/" target="_blank" className="px-6 py-2 btn-yellow rounded-full text-m" rel="noreferrer">Enviar Solicitud</a>
            <a href="https://app.numerologia-cotidiana.com/glosario-de-numerologia/" target="_blank" className="px-6 py-2 btn-blue rounded-full text-m" rel="noreferrer">Centro de ayuda</a>
            <a href="https://app.numerologia-cotidiana.com/glosario-de-numerologia/" target="_blank" className="px-6 py-2 btn-green rounded-full text-m" rel="noreferrer">Glosario</a>
          </div>
        </div>
      </div>
      <div className="row-start-3 w-80 col-start-9">
        <img className="w-80" src={bg} alt="" />
      </div>

    </div>

  );
}
