package main

import (
	"fmt"
	"log"
	"time"

	"database/sql"

	"encoding/json"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

type Datos struct {
	Username string `json:"username"`
	Name     string `json:"name"`
}

const AllowedCORSDomain = "http://localhost"

func main() {
	// Ping database
	bd, err := getDBq()
	if err != nil {
		log.Printf("Error con la base de datos" + err.Error())
		return
	} else {
		err = bd.Ping()
		if err != nil {
			log.Printf("Error al realizar conexion. revise las credenciales. el error es: " + err.Error())
			return
		}
	}
	fmt.Println("Connected to database")

	router := mux.NewRouter()
	setRoutes(router)
	// .. here you can define more routes
	// ...
	// for example setupRoutesForGenres(router)

	// Setup and start server
	port := ":8000"

	server := &http.Server{
		Handler: router,
		Addr:    port,
		// timeouts so the server never waits forever...
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	log.Printf("Server Iniciado %s", port)
	log.Fatal(server.ListenAndServe())
}

//funcion para la conexion de la base de datos
func getDBq() (*sql.DB, error) {
	return sql.Open("mysql", "admin:seminario1-grupo1@tcp(db-photobucket.c5urnai0eipr.us-east-1.rds.amazonaws.com:3306)/db-photobucket")
}

func getDatos() ([]Datos, error) {

	datos := []Datos{}
	bd, err := getDBq()
	if err != nil {
		return datos, err
	}
	// Get rows so we can iterate them
	rows, err := bd.Query("SELECT username, name FROM user")
	if err != nil {
		fmt.Println("entre al error", err)
		return datos, err
	}

	//fmt.Println("entre al rows", rows)
	for rows.Next() {
		// In each step, scan one row
		var datos2 Datos
		err = rows.Scan(&datos2.Username, &datos2.Name)
		if err != nil {
			return datos, err
		}
		// and append it to the array
		datos = append(datos, datos2)
	}

	return datos, nil
}

func setRoutes(router *mux.Router) {
	// First enable CORS. If you don't need cors, comment the next line
	enableCORS(router)
	router.HandleFunc("/usuarios", func(w http.ResponseWriter, r *http.Request) {
		userDatos, err := getDatos()
		if err == nil {
			respondWithSuccess(userDatos, w)
		} else {
			respondWithError(err, w)
		}
	}).Methods(http.MethodGet)
}

func enableCORS(router *mux.Router) {
	router.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", AllowedCORSDomain)
	}).Methods(http.MethodOptions)
	router.Use(middlewareCors)
}
func middlewareCors(next http.Handler) http.Handler {
	return http.HandlerFunc(
		func(w http.ResponseWriter, req *http.Request) {
			// Just put some headers to allow CORS...
			w.Header().Set("Access-Control-Allow-Origin", AllowedCORSDomain)
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
			// and call next handler!
			next.ServeHTTP(w, req)
		})
}

// Helper functions for respond with 200 or 500 code
func respondWithError(err error, w http.ResponseWriter) {
	w.WriteHeader(http.StatusInternalServerError)
	json.NewEncoder(w).Encode(err.Error())
}

func respondWithSuccess(data interface{}, w http.ResponseWriter) {

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(data)
}
