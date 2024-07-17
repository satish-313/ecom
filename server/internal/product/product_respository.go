package product

import (
	"context"
	"database/sql"
	"net/http"

	"github.com/labstack/echo/v4"
)

type DBtx interface {
	QueryContext(context.Context, string, ...interface{}) (*sql.Rows, error)
	QueryRowContext(context.Context, string, ...interface{}) *sql.Row
}

type repository struct {
	db DBtx
}

func NewRepository(db DBtx) Repository {
	return &repository{db: db}
}

func (r *repository) getMostDiscoutProduct(ctx context.Context) (*([]Product), error) {
	var ps []Product
	rows, err := r.db.QueryContext(ctx, "SELECT * FROM products p ORDER BY p.discount_percentage DESC LIMIT 7;")
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusInternalServerError, "err")
	}
	defer rows.Close()

	for rows.Next() {
		var p Product
		err = rows.Scan(&p.Product_id, &p.Title, &p.Description, &p.Price, &p.Discount_percentage, &p.Stock, &p.Brand, &p.Weight, &p.Dimensions, &p.Shipping_information, &p.Return_policy, &p.Thumbnail)
		ps = append(ps, p)
		if err != nil {
			return nil, echo.NewHTTPError(http.StatusInternalServerError, "err")
		}
	}
	err = rows.Err()
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusInternalServerError, "err")
	}

	return &ps, nil
}

func (r *repository) categoryProduct(ctx context.Context, category string, offset string) (*[]Product, error) {
	var ps []Product

	query := `with pid as (SELECT p.product_id FROM prodcategory p join category c on c.category_id = p.category_id WHERE c.name = $1 LIMIT 9 OFFSET $2)
			SELECT p.product_id,p.title,p.description,p.price,p.discount_percentage,p.stock,p.brand,p.weight,p.dimensions,p.shipping_information,p.return_policy,p.thumbnail FROM products p join pid p2 on p2.product_id = p.product_id;`
	rows, err := r.db.QueryContext(ctx, query, category, offset)

	if err != nil {
		return nil, echo.NewHTTPError(http.StatusInternalServerError, "query error")
	}
	defer rows.Close()

	for rows.Next() {
		var p Product
		err = rows.Scan(&p.Product_id, &p.Title, &p.Description, &p.Price, &p.Discount_percentage, &p.Stock, &p.Brand, &p.Weight, &p.Dimensions, &p.Shipping_information, &p.Return_policy, &p.Thumbnail)
		ps = append(ps, p)
		if err != nil {
			return nil, echo.NewHTTPError(http.StatusInternalServerError, err)
		}
	}
	err = rows.Err()
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusInternalServerError, "for loop error")
	}

	return &ps, nil
}
