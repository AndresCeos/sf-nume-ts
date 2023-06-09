import Spinner from './Spinner';

export function LoaderComponent() {
  return (
    <div className="grid place-items-center w-screen h-screen">
      <div className="text-center">
        <img src="/assets/logo.png" className="app-logo" alt="app-logo" />
        <p className="text-white flex items-center mt-4 justify-center">
          <Spinner className="mr-1" size="sm" />
          Cargando...
        </p>
      </div>
    </div>
  );
}

export default LoaderComponent;
