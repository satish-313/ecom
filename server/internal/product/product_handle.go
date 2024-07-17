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
	data, err := h.Service.disProd(c.Request().Context())
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "err")
	}

	return c.JSON(http.StatusOK, data)
}

func (h *Handler) CategoryProducts(c echo.Context) error {
	category := c.Param("category")
	offset := c.Param("offset")
	data, isNext, err := h.Service.categoryProduct(c.Request().Context(), category, offset)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	type res struct {
		Data   *[]Product `json:"data"`
		IsNext bool       `json:"isNext"`
	}

	return c.JSON(http.StatusOK, res{
		Data:   data,
		IsNext: isNext,
	})
}
