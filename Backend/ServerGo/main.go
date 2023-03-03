package main

import (
	"bytes"
	"crypto/md5"
	"encoding/base64"
	"fmt"
	"log"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"database/sql"

	"encoding/json"
	"net/http"

	"io/ioutil"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

type Datos struct {
	Username string `json:"username"`
	Name     string `json:"name"`
}
type albunes struct {
	Album_id int
	Name     string
}
type Validacion struct {
	Val      bool
	Password string
}

type usuarios struct {
	Username string
}

type initMethod struct {
	Bienvenido string
}

type albumid struct {
	Album_id int
}

type pictureR struct {
	Url string `json:"url"`
}

type user struct {
	Username string
	Name     string
	Password string
	Filename string
	Picture  string
}

type login struct {
	Username string
	Password string
}
type album struct {
	Username  string
	AlbumName string
}

type albumUpdate struct {
	Username     string
	AlbumName    string
	NewAlbumName string
}

type picture struct {
	Username  string
	AlbumName string
	Filename  string
	Picture   string
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

type response3 struct {
	SucessStatus interface{} `json:"successStatus"`
	ExistUser    interface{} `json:"existUser"`
	ErrorMessage interface{} `json:"errorMessage"`
}

type response4 struct {
	Status  interface{} `json:"status"`
	Result  response5   `json:"result"`
	Message string      `json:"message"`
}

type response5 struct {
	Album map[string][]pictureR `json:"album"`
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
	port := ":3010"

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

// funcion para la conexion de la base de datos
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
	//init endpoint
	router.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) {
		var init initMethod
		init.Bienvenido = "Bienvenido esta es la api de go del grupo 1 para la practica 1 - SEMINARIO DE SISTEMAS I"

		w.WriteHeader(http.StatusOK)

		json.NewEncoder(w).Encode(init)
	}).Methods(http.MethodGet)

	//primer endpoint
	router.HandleFunc("/api/user", func(w http.ResponseWriter, r *http.Request) {
		body, _ := ioutil.ReadAll(r.Body)
		var usuario user
		json.Unmarshal(body, &usuario)
		w.Header().Set("Content-Type", "application/json")

		var response response1
		var url string
		url = s3method(usuario.Picture, usuario.Filename)
		fmt.Println(url)
		response = createuser(usuario, url)
		if response.Error != nil {
			w.WriteHeader(http.StatusInternalServerError)
		} else {
			w.WriteHeader(http.StatusOK)
		}
		json.NewEncoder(w).Encode(response)
	}).Methods(http.MethodPost)

	//segundo endpoint
	router.HandleFunc("/api/user/login", func(w http.ResponseWriter, r *http.Request) {
		body, _ := ioutil.ReadAll(r.Body)
		var modelAuth login
		json.Unmarshal(body, &modelAuth)
		w.Header().Set("Content-Type", "application/json")
		var responseValidacion Validacion
		responseValidacion = finUser(modelAuth)

		var responselogin response3
		if responseValidacion.Val == true {

			passwordEn := md5.Sum([]byte(modelAuth.Password))

			if fmt.Sprintf("%x", passwordEn) == responseValidacion.Password {
				w.WriteHeader(http.StatusOK)
				responselogin.SucessStatus = true
				responselogin.ExistUser = true
				responselogin.ErrorMessage = nil
				json.NewEncoder(w).Encode(responselogin)
			} else {
				w.WriteHeader(http.StatusNotFound)
				responselogin.SucessStatus = false
				responselogin.ExistUser = true
				responselogin.ErrorMessage = "Contraseña incorrecta"
				json.NewEncoder(w).Encode(responselogin)
			}

		} else {
			w.WriteHeader(http.StatusNotFound)
			responselogin.SucessStatus = false
			responselogin.ExistUser = false
			responselogin.ErrorMessage = "El usuario no existe"
			json.NewEncoder(w).Encode(responselogin)
		}
	}).Methods(http.MethodPost)

	//tercer endpoint
	router.HandleFunc("/api/user/get", func(w http.ResponseWriter, r *http.Request) {
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
				var arreglo []response2
				if datos2.Username != "" {
					fmt.Println("entre")
					w.WriteHeader(http.StatusOK)
					response = datos2
					arreglo = append(arreglo, response)
					json.NewEncoder(w).Encode(arreglo)
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
	router.HandleFunc("/api/user", func(w http.ResponseWriter, r *http.Request) {
		body, _ := ioutil.ReadAll(r.Body)
		var usuario user
		json.Unmarshal(body, &usuario)
		w.Header().Set("Content-Type", "application/json")

		var response response1
		var url string
		url = s3method(usuario.Picture, usuario.Filename)
		response = Updateuser(usuario, url)
		if response.Error != nil {
			w.WriteHeader(http.StatusInternalServerError)
		} else {
			w.WriteHeader(http.StatusOK)
		}
		json.NewEncoder(w).Encode(response)
	}).Methods(http.MethodPut)

	//quinto endpoint
	router.HandleFunc("/api/album", func(w http.ResponseWriter, r *http.Request) {
		body, _ := ioutil.ReadAll(r.Body)
		var albumb album
		json.Unmarshal(body, &albumb)
		w.Header().Set("Content-Type", "application/json")

		var response response1
		response = createAlbum(albumb)
		if response.Error != nil {
			w.WriteHeader(http.StatusInternalServerError)
		} else {
			w.WriteHeader(http.StatusOK)
		}
		json.NewEncoder(w).Encode(response)
	}).Methods(http.MethodPost)

	//sexto endpoint
	router.HandleFunc("/api/album", func(w http.ResponseWriter, r *http.Request) {
		body, _ := ioutil.ReadAll(r.Body)
		var albumb albumUpdate
		json.Unmarshal(body, &albumb)
		w.Header().Set("Content-Type", "application/json")

		var response response1
		response = updateAlbum(albumb)
		if response.Error != nil {
			w.WriteHeader(http.StatusInternalServerError)
		} else {
			w.WriteHeader(http.StatusOK)
		}
		json.NewEncoder(w).Encode(response)
	}).Methods(http.MethodPut)

	//septimo endpoint
	router.HandleFunc("/api/album", func(w http.ResponseWriter, r *http.Request) {
		body, _ := ioutil.ReadAll(r.Body)
		var albumb album
		json.Unmarshal(body, &albumb)
		w.Header().Set("Content-Type", "application/json")

		var response response1
		response = DeleteAlbum(albumb)
		if response.Error != nil {
			w.WriteHeader(http.StatusInternalServerError)
		} else {
			w.WriteHeader(http.StatusOK)
		}
		json.NewEncoder(w).Encode(response)
	}).Methods(http.MethodDelete)

	//octavo endpoint
	router.HandleFunc("/api/picture", func(w http.ResponseWriter, r *http.Request) {
		body, _ := ioutil.ReadAll(r.Body)
		var picture picture
		json.Unmarshal(body, &picture)
		w.Header().Set("Content-Type", "application/json")

		var response response1
		var url string
		url = s3method(picture.Picture, picture.Filename)
		response = createPicture(picture, url)
		if response.Error != nil {
			w.WriteHeader(http.StatusInternalServerError)
		} else {
			w.WriteHeader(http.StatusOK)
		}
		json.NewEncoder(w).Encode(response)
	}).Methods(http.MethodPost)

	//noveno endpoint
	router.HandleFunc("/api/album/get", func(w http.ResponseWriter, r *http.Request) {
		body, _ := ioutil.ReadAll(r.Body)
		var userb usuarios
		json.Unmarshal(body, &userb)
		w.Header().Set("Content-Type", "application/json")
		albums := []albunes{}
		var response response4
		albums = append(albums, findAlbum(userb)...)
		//fmt.Println(albums)
		if len(albums) > 0 {
			albumResponse := make(map[string][]pictureR)
			for _, album := range albums {
				pictureList := getPictures(album.Album_id)
				fmt.Println(pictureList)

				albumResponse[album.Name] = pictureList
			}
			w.WriteHeader(http.StatusOK)
			response.Status = true
			response.Result.Album = albumResponse
		} else {
			w.WriteHeader(http.StatusNotFound)
			response.Status = false
			response.Result.Album = nil
			response.Message = "El usuario no tiene albums creados"
		}

		json.NewEncoder(w).Encode(response)
	}).Methods(http.MethodPost)

}
func s3method(url string, filename string) string {

	// Decodifica la imagen en base64
	imageBytes, err := base64.StdEncoding.DecodeString(url)
	if err != nil {
		fmt.Println(err)
		fmt.Println("No se pudo decodificar la imagen")
	}

	// Crea una sesión de AWS
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("us-east-1"), // Cambiar por la región deseada
		Credentials: credentials.NewStaticCredentials(
			"AKIAV2WSSDG75MMIAJ6P",
			"rhNFYh+h5kvK1LeLbSP4HDKI3wwQPm8D5D6dKANx",
			""),
	})
	if err != nil {
		fmt.Println(err)
		fmt.Println("No se pudo crear la sesion de AWS")
	}
	// Crea un nuevo cliente de Amazon S3
	svc := s3.New(sess)

	// Abre la imagen decodificada en un buffer de lectura
	imageReader := bytes.NewReader(imageBytes)

	// Obtener la extensión del archivo original
	extension := filepath.Ext(filename)
	contentType := getContentType(extension)

	// Crear un nuevo nombre de archivo con el formato deseado
	timestamp := time.Now().Format("20060102150405")
	newFilename := fmt.Sprintf("%s-%s-Go%s", strings.TrimSuffix(filename, extension), timestamp, extension)

	// Sube la imagen al bucket de S3
	_, err = svc.PutObject(&s3.PutObjectInput{
		Bucket:      aws.String("practica1-g1-imagenes-semi1"), // Cambiar por el nombre del bucket deseado
		Key:         aws.String(newFilename),
		Body:        imageReader,
		ContentType: &contentType,
	})
	if err != nil {
		fmt.Println(err)
		fmt.Println("No se pudo subir la imagen al Bucket de S3")
	}
	urlStr := fmt.Sprintf("https://%s.s3.amazonaws.com/%s", "practica1-g1-imagenes-semi1", newFilename)
	fmt.Printf("Imagen subida correctamente a S3 -> %s", newFilename)
	return urlStr

}

func getContentType(extension string) string {
	switch extension {
	case ".bmp":
		return "image/bmp"
	case ".gif":
		return "image/gif"
	case ".ico":
		return "image/x-icon"
	case ".jpeg", ".jpg":
		return "image/jpeg"
	case ".png":
		return "image/png"
	case ".svg":
		return "image/svg+xml"
	case ".tiff":
		return "image/tiff"
	case ".webp":
		return "image/webp"
	default:
		return ""
	}
}

func finUser(modelo login) Validacion {
	fmt.Println("entre")
	var responseval Validacion
	datos := []login{}
	bd, err := getDBq()
	if err != nil {
		responseval.Val = false
		responseval.Password = ""
		return responseval
	}
	// Get rows so we can iterate them
	rows, err := bd.Query("SELECT username, password FROM user WHERE username =" + "'" + modelo.Username + "'" + "AND deleted_at IS NULL ")
	if err != nil {
		fmt.Println("entre al error", err)
		responseval.Val = false
		responseval.Password = ""
		return responseval
	}
	if rows.Next() {

		fmt.Println("entre a true")
		// In each step, scan one row
		var datos2 login
		err = rows.Scan(&datos2.Username, &datos2.Password)
		fmt.Println("voy aca")
		if err != nil {
			responseval.Val = false
			responseval.Password = ""
			return responseval
		}
		// and append it to the array
		datos = append(datos, datos2)
		//if(datos)

		fmt.Println(datos[0].Password)
		if len(datos) > 0 {
			responseval.Val = true
			responseval.Password = datos[0].Password
			return responseval

		} else {

			responseval.Val = false
			responseval.Password = ""
			return responseval
		}

	} else {

		responseval.Val = false
		responseval.Password = ""
		return responseval
	}

}

func findAlbum(user usuarios) []albunes {
	fmt.Println(user.Username)
	var responseval Validacion
	datos := []albunes{}
	error := []albunes{}
	bd, err := getDBq()
	if err != nil {
		responseval.Val = false
		responseval.Password = ""
		return datos
	}
	// Get rows so we can iterate them

	rows, err := bd.Query("SELECT album_id, name FROM album WHERE username =" + "'" + user.Username + "'" + "AND deleted_at IS NULL ")
	if err != nil {

		return error
	}
	for rows.Next() {
		// In each step, scan one row
		var datos2 albunes
		err = rows.Scan(&datos2.Album_id, &datos2.Name)
		if err != nil {
			return error
		}
		// and append it to the array
		datos = append(datos, datos2)
	}

	return datos
}

func getPictures(id int) []pictureR {
	fmt.Println(id)
	var responseval Validacion
	datos := []pictureR{}
	error := []pictureR{}
	bd, err := getDBq()
	if err != nil {
		responseval.Val = false
		responseval.Password = ""
		return datos
	}
	// Get rows so we can iterate them

	rows, err := bd.Query("SELECT url FROM picture WHERE album_id = " + strconv.Itoa(id) + " AND deleted_at IS NULL ")
	//fmt.Println("SELECT url FROM picture WHERE album_id =" + strconv.Itoa(id) + "AND deleted_at IS NULL ")
	if err != nil {

		return error
	}
	for rows.Next() {
		// In each step, scan one row
		var datos2 pictureR
		err = rows.Scan(&datos2.Url)
		if err != nil {
			return error
		}
		// and append it to the array
		datos = append(datos, datos2)
		//fmt.Println(datos)
	}

	return datos
}
func createuser(usuario user, url string) response1 {
	//fmt.Println(usuario)
	var res response1
	bd, err := getDBq()
	if err != nil {
		res.SucessStatus = false
		res.ErrorMessage = "Hubo un error con la conexion de la base de datos"
		res.Error = err
		return res
	}
	query, err := bd.Query("call new_user('" + usuario.Username + "'," + "'" + usuario.Name + "','" + usuario.Password + "', '" + url + "')")
	if err != nil {
		res.SucessStatus = false
		res.ErrorMessage = "Hubo un error en la creación de usuario revise el servidor de go"
		res.Error = err

		return res
	}

	if query.Next() {

		res.SucessStatus = 1
		res.ErrorMessage = nil

	} else {

		res.SucessStatus = false
		res.ErrorMessage = "El usuario ya existe"

	}

	return res
}

func createAlbum(albuum1 album) response1 {
	//fmt.Println(usuario)
	var res response1
	bd, err := getDBq()
	if err != nil {
		res.SucessStatus = false
		res.ErrorMessage = "Hubo un error con la conexion de la base de datos"
		res.Error = err
		return res
	}
	query, err := bd.Query("call new_album('" + albuum1.Username + "'," + " '" + albuum1.AlbumName + "')")
	fmt.Println(query)
	if err != nil {
		res.SucessStatus = false
		res.ErrorMessage = "Hubo un error en la creación del album revise el servidor de go"
		res.Error = err

		return res
	} else {
		res.SucessStatus = 1
		res.ErrorMessage = nil

	}
	return res
}
func updateAlbum(albuum1 albumUpdate) response1 {
	//fmt.Println(usuario)
	var res response1
	bd, err := getDBq()
	if err != nil {
		res.SucessStatus = false
		res.ErrorMessage = "Hubo un error con la conexion de la base de datos"
		res.Error = err
		return res
	}
	query, err := bd.Query("call update_album('" + albuum1.Username + "'," + " '" + albuum1.AlbumName + "'," + " '" + albuum1.NewAlbumName + "')")
	fmt.Println(query)
	if err != nil {
		res.SucessStatus = false
		res.ErrorMessage = "Hubo un error en la actualización del album revise el servidor de go"
		res.Error = err

		return res
	} else {
		res.SucessStatus = 1
		res.ErrorMessage = nil
		/*for query.Next() {
		// In each step, scan one row
		var datos2 response1

		//json.Unmarshal(datos2, &datos3)
		err = query.Scan(&datos2.SucessStatus, &datos2.ErrorMessage)

		fmt.Println(int(big.NewInt(0).SetBytes(datos2.SucessStatus).Uint64()))
		if err != nil {
			fmt.Println("entre al error")
		} else {
			fmt.Println("ENTRE AL BUENO")
			res.SucessStatus = 1
			res.ErrorMessage = nil
		*/

	}
	return res
}

func createPicture(picture1 picture, url string) response1 {
	//fmt.Println(picture1)
	var res response1
	bd, err := getDBq()
	if err != nil {
		res.SucessStatus = false
		res.ErrorMessage = "Hubo un error con la conexion de la base de datos"
		res.Error = err
		return res
	}
	query, err := bd.Query("call new_picture('" + picture1.Username + "'," + " '" + picture1.AlbumName + "'," + " '" + url + "')")
	fmt.Println(query)
	if err != nil {
		res.SucessStatus = false
		res.ErrorMessage = "Hubo un error en la creación de la foto revise el servidor de go"
		res.Error = err

		return res
	} else {
		res.SucessStatus = 1
		res.ErrorMessage = nil

	}
	return res
}

func Updateuser(usuario user, url string) response1 {
	//fmt.Println(usuario)
	var res response1
	bd, err := getDBq()
	if err != nil {
		res.SucessStatus = false
		res.ErrorMessage = "Hubo un error con la conexion de la base de datos"
		res.Error = err
		return res
	}
	query, err := bd.Query("call update_user('" + usuario.Username + "'," + "'" + usuario.Name + "', '" + url + "')")
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

func DeleteAlbum(albuum1 album) response1 {
	//fmt.Println(usuario)
	var res response1
	bd, err := getDBq()
	if err != nil {
		res.SucessStatus = false
		res.ErrorMessage = "Hubo un error con la conexion de la base de datos"
		res.Error = err
		return res
	}
	query, err := bd.Query("call delete_album('" + albuum1.Username + "'," + " '" + albuum1.AlbumName + "')")
	fmt.Println(query)
	if err != nil {
		res.SucessStatus = false
		res.ErrorMessage = "Hubo un error en la eliminación del album revise el servidor de go"
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
