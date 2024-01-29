import useAxiosPrivate from "../hooks/useAxiosPrivate";



const PrivateDataParser = async (URL, AUTH_TYPE, userId, amount) => {
    const axiosPrivate = useAxiosPrivate();
    const controller = new AbortController();
   
    try {
      const response = await axiosPrivate.post(
        URL,
        JSON.stringify({
          userId: userId,
          amount: parseFloat(amount),
          trasactionType: AUTH_TYPE,
        }),
        {
          signal: controller.signal,
        }
      );

      return {data: response, hasError: false};
    } catch (err) {
      return {data: err?.data, hasError: true};
    }
  };

  export default PrivateDataParser;


//   const useAuth = () => {
//     const { auth } = useContext(AuthContext);
//     useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
//     return useContext(AuthContext);
// }

// export default useAuth;