import React, {Component, createContext} from 'react';

export let user = {
    username : "ericyounger",
    avatar: "https://pngimg.com/uploads/github/github_PNG33.png",
};


export let UserContext = createContext(user);