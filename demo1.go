package main

//importing all the packages
import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/elgs/gosqljson"
	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB // declare a global variable that will be used by all handlers

func init() {
	var err error
	db, err = sql.Open("mysql", "uphbho7uygvd8xwt:NQgg6V47ZpGL4Ouhmvrp@tcp(bibhkwulgkabllibpezu-mysql.services.clever-cloud.com:3306)/bibhkwulgkabllibpezu") // initialize the global connection
	if err != nil {
		panic(err)
	}
}

//user defined error structure for login
type loginError struct {
	err        string //error description
	username   string //username which caused the error
	password   string //password which caused the error
	dbpassword string //if dbpassword  caused the error
}

func (e *loginError) Error() string {
	return e.err
}

//function to check username is empty
func (e *loginError) usernameEmpty() bool {
	return len(e.username) == 0
}

//function to check the password is correct
func (e *loginError) passwordMismatch() bool {
	return e.password != e.dbpassword
}

type registerError struct {
	err             string //error description
	username        string //username which caused the error
	password        string //password which caused the error
	confirmpassword string //if dbpassword  caused the error
	email           string
	phone           string
}

func (e *registerError) Error() string {
	return e.err
}

//function to check username is empty
func (e *registerError) usernameEmpty() bool {
	return len(e.username) == 0
}

//function to check the password  and confirm password matches
func (e *registerError) passwordMismatch() bool {
	return e.password != e.confirmpassword
}

//function to check email is empty
func (e *registerError) emailEmpty() bool {
	return len(e.email) == 0
}

//function to check phone has 10 digits
func (e *registerError) phoneEmpty() bool {
	return len(e.username) != 10
}

//check whether the user credentials are correct
func validLogin(username string, password string, dbpassword string) error {
	err := ""
	if len(username) == 0 {
		err += "username field is empty"

	}

	if password != dbpassword {
		err += " password is incorrect"
	}

	if err != "" {
		return &loginError{err, username, password, dbpassword}
	}
	return nil

}

//fubction to check if there is any error during registration
func validRegister(username string, password string, confirmpassword string, email string, phone string) error {
	err := ""
	if len(username) == 0 {
		err += "Username cannot be empty"
		return &registerError{err, username, password, confirmpassword, email, phone}
	}
	if len(password) == 0 {
		err += "password cannot be empty"
		return &registerError{err, username, password, confirmpassword, email, phone}
	}
	if password != confirmpassword {
		err += "Password and confirm password does not matches"
		return &registerError{err, username, password, confirmpassword, email, phone}
	}

	if len(email) == 0 {
		err += "email cannot be empty"
		return &registerError{err, username, password, confirmpassword, email, phone}
	}
	if len(phone) != 10 {
		err += "phone Number should be exactly 10 digits"
		return &registerError{err, username, password, confirmpassword, email, phone}
	}
	return nil

}

//check whether username is empty
func isEmptyUser(username string) error {
	if len(username) == 0 {
		return errors.New("username is empty")
	}
	return nil
}

//check if the user exists in the databse
func isUser(count int) error {
	if count == 0 {
		return errors.New("Username not exists!")
	}
	return nil
}

//Register the new user
func register(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	//getting the from deatils entered by the user
	name := r.FormValue("username")
	password := r.FormValue("password")
	confirmpassword := r.FormValue("Confirmpassword")
	email := r.FormValue("email")
	phone := r.FormValue("phone")

	//checking for the vioaltion
	err1 := validRegister(name, password, confirmpassword, email, phone)

	//check if there is any error
	if err1 != nil {
		if err1, ok := err1.(*registerError); ok {
			if err1.usernameEmpty() { //if the username is empty
				fmt.Println("error: username cannot be empty")
				panic(err1.Error())

			}
			if err1.passwordMismatch() { //if the password mismatches
				fmt.Println("error: password mismatches ")
				panic(err1.Error())

			}

			if err1.emailEmpty() { //if the email is empty
				fmt.Println("error: email cannot be empty")
				panic(err1.Error())

			}

			if err1.phoneEmpty() { //if the phone is empty
				fmt.Println("error: phone number should have 10 digits!")
				panic(err1.Error())

			}
			return

		}
		return

	}

	// perform a db.Query insert
	insert, err := db.Prepare("INSERT INTO Login(username,password,email,phone) VALUES(?,?,?,?)")

	// if there is an error inserting, handle it
	if err != nil {
		panic(err.Error())
	}

	// executing the query
	insert.Exec(name, password, email, phone)
	return

}

//function to insert contacts to the gmail
func insert(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	//getting the from deatils entered by the user
	name := r.FormValue("username")
	email := r.FormValue("email")
	password := "password"
	phone := "8008317399"

	// perform a db.Query insert
	insert, err := db.Prepare("INSERT INTO Login(username,password,email,phone) VALUES(?,?,?,?)")

	// if there is an error inserting, handle it
	if err != nil {
		panic(err.Error())
	}

	// executing the query
	insert.Exec(name, password, email, phone)
	return

}

//check whether the user exists
func login(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// retrieving the values from the form post
	Enteredname := r.FormValue("username")
	Enteredpassword := r.FormValue("password")

	//fmt.Println(Enteredname)
	//if the Entered name is empty then raise the error
	err1 := isEmptyUser(Enteredname)

	if err1 != nil {
		panic(err1.Error())
		return
	}

	//checking if the user exists
	rows2, err2 := db.Query("SELECT count(*) FROM Login WHERE username=?", Enteredname)

	if err2 != nil {
		panic(err2.Error())
	}
	defer rows2.Close()

	var count int

	//counting the no of rows selected
	for rows2.Next() {
		if err2 := rows2.Scan(&count); err2 != nil {
			panic(err2.Error())
		}
	}

	//calling function ti check whether the user exists
	err3 := isUser(count)

	if err3 != nil {
		panic(err3.Error())
		return
	}

	// retriving the password for the username
	rows, err := db.Query("SELECT password FROM Login WHERE username=?", Enteredname)

	defer rows.Close()

	if err != nil {
		panic(err.Error())
	}

	// iterating over each row

	for rows.Next() {

		var password string

		//scanning the password of the select row into password variable
		err := rows.Scan(&password)

		//checking if there is any error
		if err != nil {
			panic(err.Error())
		}
		// cheking whether the password matches or not
		err1 := validLogin(Enteredname, Enteredpassword, password)

		//if there is any return we will break here
		if err1 != nil {
			if err1, ok := err1.(*loginError); ok {
				if err1.usernameEmpty() { //if the username is empty
					fmt.Println("error: username cannot be empty")
					panic(err1.Error())

				}
				if err1.passwordMismatch() { //if the password mismatches
					fmt.Println("error: wrong password")
					panic(err1.Error())

				}
				return
			}
			return

		}
		return
	}

	// if there is error we will return
	err = rows.Err()
	if err != nil {
		panic(err.Error())
	}
}

//get all the contacts of the user
func getAllContacts(w http.ResponseWriter, req *http.Request) {

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	results := []map[string]string{}
	theCase := "lower"
	rows, err := db.Query("SELECT * FROM Login")
	cols, _ := rows.Columns()
	fmt.Println(cols)
	colsLower := make([]string, len(cols))

	if theCase == "lower" {
		for i, v := range cols {
			colsLower[i] = strings.ToLower(v)
		}
	}

	for rows.Next() {
		result := make(map[string]string, len(cols))
		var username, password, email, phone string
		rows.Scan(&username, &password, &email, &phone)
		result[colsLower[0]] = username
		result[colsLower[1]] = password
		result[colsLower[2]] = email
		result[colsLower[3]] = phone

		results = append(results, result)
	}
	w.Header().Set("Content-Type", "application/json")

	//Encoding to json
	err = json.NewEncoder(w).Encode(results)

	//return if there is  NULL
	if err != nil {
		return
	}
	return

}

//get the particular contact that is being searched
func searchContact(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	//getting the username to be searched
	name := r.FormValue("username")

	theCase := "lower"

	// using the sql like statement
	data, _ := gosqljson.QueryDbToMap(db, theCase, "SELECT username,email,phone  FROM Login where username like ?", name+"%")

	w.Header().Set("Content-Type", "application/json")

	//Encoding to json
	err := json.NewEncoder(w).Encode(data)

	//return if there is  NULL
	if err != nil {
		return
	}
	return

}

func main() {
	http.HandleFunc("/register", register)
	http.HandleFunc("/login", login)
	http.HandleFunc("/getAllContacts", getAllContacts)
	http.HandleFunc("/searchContact", searchContact)
	http.HandleFunc("/insert", insert)
	http.ListenAndServe(":8080", nil)
}
