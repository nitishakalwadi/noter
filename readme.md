# Noter
This application allows a user to save, edit and delete notes

# Api End points

    api root - https://noter-nitishakalwadi.rhcloud.com/api

    Login - /login
    type - POST
    params: email, password

    Register - /register
    type - POST
    params: email, password, confirmPassword

    Logout - /logout
    type - POST

    Get all notes - /notes/all
    type - GET

    Save Note - /notes/save
    type - POST
    params: title, note

    Update Note - /notes/update
    type - POST
    params: noteId, title, note

    Delete Note - /notes/delete
    type - POST
    params: noteId

    Get a single note - /notes/getNote
    type - POST
    params: noyeId

# Framework - Codeigniter 3

# Libraries used

# Backend

Base Model
https://github.com/avenirer/CodeIgniter-MY_Model

Rest server
https://github.com/chriskacerguis/codeigniter-restserver
Made minor chages to the above rest server so that the keys have validity
By default, keys are valid for 24 hours, but it can be chaged through config

Ion auth for initial user login and registration
https://github.com/benedmunds/CodeIgniter-Ion-Auth

# Frontend

JQuery

Bootstrap

https://github.com/js-cookie/js-cookie
For storing values in cookie

https://github.com/CodeSeven/toastr
To display notifications

https://github.com/jquery-validation/jquery-validation
For front end validation

# Schema
noter.sql

ION AUTH TABLES
users
groups
login_attempts
users_groups

REST SERVER TABLES
keys

NOTER TABLES
notes