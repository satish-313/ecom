package router

import (
	"server/internal/product"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

var e *echo.Echo

func InitRouter(h *product.Handler) {
	e = echo.New()
	e.Use(middleware.CORS())
	e.GET("/discout_product", h.TopDiscountProducts)
	e.GET("/category/:category/:offset", h.CategoryProducts)
}

func Start() {
	e.Logger.Fatal(e.Start(":1323"))
}
