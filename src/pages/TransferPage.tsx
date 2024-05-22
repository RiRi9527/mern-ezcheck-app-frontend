import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TransferPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    // Navigate to the page when the component is loaded
    navigate(`/main/${userId}`);
  }, []); // The empty array here indicates that this effect runs only once when the component is loaded

  return <div>Nothing</div>;
};

export default TransferPage;
