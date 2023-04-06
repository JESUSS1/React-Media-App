import { useState, useRef, useEffect, createContext, useContext } from "react";

const userForm = createContext();

export const useUserForm = () => {
    return useContext(userForm);
}



