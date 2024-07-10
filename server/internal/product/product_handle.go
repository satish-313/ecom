package product

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type Handler struct {
	Service
}

func NewHandler(s Service) *Handler {
	return &Handler{
		Service: s,
	}
}

func (h *Handler) TopDiscountProducts(c echo.Context) error {
	data, err := h.Service.DisProd(c.Request().Context())
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "err")
	}

	type res struct {
		Data *[]Product `json:"data"`
	}
	return c.JSON(http.StatusOK, res{Data: data.data})
}
