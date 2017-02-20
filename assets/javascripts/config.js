var config = window.config || {};

var apiRoot = "//noter-nitishakalwadi.c9users.io/api";

config.api = {
    apiRoot: apiRoot,
    
    endpoints: {
        login: {
            url: apiRoot + "/login",
            method: "POST"
        },
        register: {
            url: apiRoot + "/register",
            method: "POST"
        },
        logout: {
            url: apiRoot + "/logout",
            method: "POST"
        },
        allNotes: {
            url: apiRoot + "/notes/all",
            method: "GET"
        },
        getNote: {
            url: apiRoot + "/notes/getNote",
            method: "POST"
        },
        saveNote: {
            url: apiRoot + "/notes/save",
            method: "POST"
        },
        deleteNote: {
            url: apiRoot + "/notes/delete",
            method: "POST"
        }
    },
    apiKey: {
        name: "X-API-KEY"
    }
};

config.messages = {
    loginSuccess: "Successfully logged in",
    logoutSuccess: "Successfully logged out",
    registerSuccess: "User registered successfully",
    invalidEmail: "Invalid Email address",
    noteSaveSuccess: "Note saved successfully",
    noteDeleteSuccess: "Note deleted successfully"
};