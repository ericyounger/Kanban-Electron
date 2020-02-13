import React, {Component, createContext} from 'react';

let user = {
    username : "ericyounger",
    avatar : "https://postmediatorontosun.files.wordpress.com/2019/12/cat-e1575303121192.jpg",
};


export let UserContext = createContext(user);