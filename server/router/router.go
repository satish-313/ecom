package router

import (
	"server/internal/product"

	"github.com/labstack/echo/v4"
)

var e *echo.Echo

func InitRouter(h *product.Handler) {
	e = echo.New()

	e.GET("/discout_product", h.TopDiscountProducts)
}

func Start() {
	e.Logger.Fatal(e.Start(":1323"))

}
