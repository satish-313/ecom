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

type Repository interface {
	GetMostDiscoutProduct(context.Context) (*([]Product), error)
}

type Service interface {
	DisProd(context.Context) (*DisProdRes, error)
}

type DisProdRes struct {
	data *([]Product)
}
