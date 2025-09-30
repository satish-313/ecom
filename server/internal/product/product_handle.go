package product

import (
	"net/http"
	"strconv"

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

func (h *Handler) CateMostProd(c echo.Context) error {
	offset := c.Param("offset")
	data, isNext, err := h.Service.cateWithMostProd(c.Request().Context(), offset)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	type res struct {
		Data   *[]Category `json:"data"`
		IsNext bool        `json:"isNext"`
	}

	return c.JSON(http.StatusOK, res{
		Data:   data,
		IsNext: isNext,
	})
}

func (h *Handler) GetProdById(c echo.Context) error {
	id := c.Param("id")
	nId, err := strconv.Atoi(id)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err)
	}
	p, err := h.Service.getProdById(c.Request().Context(), nId)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, p)
}
