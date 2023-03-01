package main

import (
	"fmt"
	"log"
	"time"

	"database/sql"

	"encoding/json"
	"net/http"

	"io/ioutil"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

type Datos struct {
	Username string `json:"username"`
	Name     string `json:"name"`
}

type user struct {
	Username string
	Name     string
	Password string
	Filename string
	Picture  string
}

type response1 struct {
	SucessStatus interface{} `json:"successStatus"`
	ErrorMessage interface{} `json:"errorMessage"`
	Error        interface{} `json:"error"`
}

type response2 struct {
	Username        string `json:"username"`
	Name            string `json:"name"`
	Picture_profile string `json:"picture_profile"`
}
type responseError2 struct {
	Status  interface{} `json:"status"`
	Message string      `json:"message"`
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
	log.Printf("Server Iniciado Seminario 1 %s", port)
	log.Fatal(server.ListenAndServe())
}

//funcion para la conexion de la base de datos
func getDBq() (*sql.DB, error) {
	return sql.Open("mysql", "admin:seminario1-grupo1@tcp(database-photobucket.cr1hjnbhot0g.us-east-1.rds.amazonaws.com:3306)/db-photobucket")
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
	//primer endpoint
	router.HandleFunc("/user", func(w http.ResponseWriter, r *http.Request) {
		body, _ := ioutil.ReadAll(r.Body)
		var usuario user
		json.Unmarshal(body, &usuario)
		w.Header().Set("Content-Type", "application/json")

		var response response1
		response = createuser(usuario)
		if response.Error != nil {
			w.WriteHeader(http.StatusInternalServerError)
		} else {
			w.WriteHeader(http.StatusOK)
		}
		json.NewEncoder(w).Encode(response)
	}).Methods(http.MethodPost)

	//tercer endpoint
	router.HandleFunc("/user", func(w http.ResponseWriter, r *http.Request) {
		body, _ := ioutil.ReadAll(r.Body)
		var usuario user
		json.Unmarshal(body, &usuario)
		w.Header().Set("Content-Type", "application/json")

		var response response2
		var responseError responseError2
		bd, err1 := getDBq()
		if err1 != nil {
			fmt.Println(err1)
		}
		query, err2 := bd.Query("call get_user('" + usuario.Username + "')")
		fmt.Println(query)

		if err2 != nil {
			fmt.Println("ERROR")
		}
		for query.Next() {
			// In each step, scan one row
			var datos2 response2
			err2 = query.Scan(&datos2.Username, &datos2.Name, &datos2.Picture_profile)
			response = datos2
			fmt.Println(datos2)
			if err2 != nil {
				w.WriteHeader(http.StatusNotFound)
				responseError.Status = false
				responseError.Message = "El usuario no existe"
				json.NewEncoder(w).Encode(responseError)
			} else {
				if datos2.Username != "" {
					fmt.Println("entre")
					w.WriteHeader(http.StatusOK)
					response = datos2
					json.NewEncoder(w).Encode(response)
				} else {
					fmt.Println("entre2")
					w.WriteHeader(http.StatusNotFound)
					responseError.Status = false
					responseError.Message = "El usuario no existe"
					json.NewEncoder(w).Encode(responseError)
				}

			}
		}

	}).Methods(http.MethodPost)

	//cuarto endpoint
	router.HandleFunc("/user", func(w http.ResponseWriter, r *http.Request) {
		body, _ := ioutil.ReadAll(r.Body)
		var usuario user
		json.Unmarshal(body, &usuario)
		w.Header().Set("Content-Type", "application/json")

		var response response1
		response = Updateuser(usuario)
		if response.Error != nil {
			w.WriteHeader(http.StatusInternalServerError)
		} else {
			w.WriteHeader(http.StatusOK)
		}
		json.NewEncoder(w).Encode(response)
	}).Methods(http.MethodPut)
}

func createuser(usuario user) response1 {
	//fmt.Println(usuario)
	var res response1
	bd, err := getDBq()
	if err != nil {
		res.SucessStatus = false
		res.ErrorMessage = "Hubo un error con la conexion de la base de datos"
		res.Error = err
		return res
	}
	query, err := bd.Query("call new_user('" + usuario.Username + "'," + "'" + usuario.Name + "','" + usuario.Password + "', '" + usuario.Picture + "')")
	fmt.Println(query.Next())
	if err != nil {
		res.SucessStatus = false
		res.ErrorMessage = "Hubo un error en la creación de usuario revise el servidor de go"
		res.Error = err

		return res
	} else {
		res.SucessStatus = 1
		res.ErrorMessage = nil

	}
	return res
}

func Updateuser(usuario user) response1 {
	//fmt.Println(usuario)
	var res response1
	bd, err := getDBq()
	if err != nil {
		res.SucessStatus = false
		res.ErrorMessage = "Hubo un error con la conexion de la base de datos"
		res.Error = err
		return res
	}
	query, err := bd.Query("call update_user('" + usuario.Username + "'," + "'" + usuario.Name + "', '" + usuario.Picture + "')")
	fmt.Println(query)
	if err != nil {
		res.SucessStatus = false
		res.ErrorMessage = "Hubo un error en la actualización de usuario revise el servidor de go"
		res.Error = err

		return res
	} else {
		res.SucessStatus = 1
		res.ErrorMessage = nil

	}
	return res
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
