import { toast } from "react-toastify";
import useUserStore from "../store/useStore";
import { useMutation } from "react-query";
import logoutService from "../services/logoutService";

function useLogout() {
  const { setUser } = useUserStore();

  const mutation = useMutation(logoutService, {
    onSuccess: (data) => {
      setUser({});
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error("Something went wrong");
      console.log(error);
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  return { handleLogout };
}

export default useLogout;
