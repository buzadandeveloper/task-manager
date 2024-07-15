const LoadingSpinner = async (authData, setIsLoading, navigate) => {
    setIsLoading(true);
    try{
        await new Promise ((resolve) => setTimeout(resolve, 2000));
        navigate("/taskviewer");
    }
    catch(error){
        console.error(error);
    }
    finally{
        setIsLoading(false);
    }
};

export default LoadingSpinner;