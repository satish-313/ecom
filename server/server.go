package main

import (
	"log"
	"net/http"

	"server/db"

	"github.com/labstack/echo"
)

type product struct {
	product_id           int
	title                string
	descripition         string
	price                float32
	discount_percentage  float32
	brand                string
	weight               float32
	dimensions           string
	shipping_information string
	return_policy        string
	thumbnail            string
}

func main() {
	dbCon, err := db.InitDb()
	if err != nil {
		log.Fatal(err)
	}
	defer dbCon.Close()
	err = dbCon.GetDb().Ping()
	if err != nil {
		log.Fatal(err)
	}

	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello world")
	})

	e.Logger.Fatal(e.Start(":1323"))
}
