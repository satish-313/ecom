package main

import (
	"log"

	"server/db"
	"server/internal/product"
	"server/router"
)

func main() {
	dbCon, err := db.InitDb()
	if err != nil {
		log.Fatal(err)
	}
	defer dbCon.Close()
	proRepo := product.NewRepository(dbCon.GetDb())
	proSer := product.NewService(proRepo)
	proHandle := product.NewHandler(proSer)

	router.InitRouter(proHandle)
	router.Start()
}
