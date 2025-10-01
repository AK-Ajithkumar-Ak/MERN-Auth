
export const LoadingSpinner = () => {
  return (
    <div className="bg-black min-vh-100 min-vw-100 d-flex justify-content-center align-items-center">
    <div className="spinner-border text-primary" style={{width: "4rem", height: "4rem"}} role="status">
  {/* <span className="visually-hidden">Loading...</span> */}
  </div>
    </div>
  );
};
