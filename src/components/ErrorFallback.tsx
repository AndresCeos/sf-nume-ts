import Logo from '@/assets/logo.png';

function ErrorFallback() {
  return (
    <div
      className="text-white w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <img src={Logo} className="app-logo" alt="app-logo" />
      <h2 className="text-lg font-semibold my-3">Ooops, algo sali&oacute; mal :( </h2>
      <button type="button" className="btn btn-white mt-4" onClick={() => window.location.assign(window.location.origin)}>
        Reintentar
      </button>
    </div>
  );
}

export default ErrorFallback;
