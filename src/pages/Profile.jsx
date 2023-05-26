import React, { useContext } from "react";
import { context } from "../main";
import Loader from "../Components/Loader";

const Profile = () => {
    const { isAuthenticated, loading, userData } = useContext(context);

    return loading ? (
        <Loader />
    ) : (
        <div>
            <h1>{userData?.name}</h1>
            <p>{userData?.email}</p>
        </div>
    );
};

export default Profile;