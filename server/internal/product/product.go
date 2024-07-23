package product

import (
	"context"
)

type Product struct {
	Product_id           int64   `json:"product_id" db:"product_id"`
	Title                string  `json:"title" db:"title"`
	Description          string  `json:"description" db:"description"`
	Price                float64 `json:"price" db:"price"`
	Discount_percentage  float64 `json:"discount_percentage" db:"discount_percentage"`
	Stock                int64   `json:"stock" db:"stock"`
	Brand                string  `json:"brand" db:"brand"`
	Weight               float64 `json:"weight" db:"weight"`
	Dimensions           string  `json:"dimensions" db:"dimensions"`
	Shipping_information string  `json:"shipping_information" db:"shipping_information"`
	Return_policy        string  `json:"return_policy" db:"return_policy"`
	Thumbnail            string  `json:"thumbnail" db:"thumbnail"`
}

type Category struct {
	CategoryId int64  `json:"category_id"`
	Name       string `json:"category_name"`
}

type Repository interface {
	getMostDiscoutProduct(context.Context) (*([]Product), error)
	categoryProduct(context.Context, string, string) (*[]Product, error)
	categoryWithProd(context.Context, string) (*[]Category, error)
	getProdById(context.Context, int) (*Product, error)
}

type Service interface {
	disProd(context.Context) (*([]Product), error)
	categoryProduct(context.Context, string, string) (*[]Product, bool, error)
	cateWithMostProd(context.Context, string) (*[]Category, bool, error)
	getProdById(context.Context, int) (*Product, error)
}
