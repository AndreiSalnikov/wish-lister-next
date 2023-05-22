import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {mainApi} from "@/utils/MainApi";
import {updateUser} from "@/store/actions/user";

export const withAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Fetch the user if it hasn't been fetched yet
      if (!user) {
        mainApi
          .getMe()
          .then((data) => dispatch(updateUser(data)))
          .catch((err) => console.error(err))
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    }, [user]);

    // If user is not authenticated, redirect to login page
    if (!user && !isLoading) {
      if (typeof window !== "undefined") {
        router.replace("/");
      }
      return null;
    }

    // If user is authenticated or still loading, render the wrapped component
    return isLoading ? null : <WrappedComponent {...props} />;
  };
};
