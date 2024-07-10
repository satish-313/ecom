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

func (r *repository) GetMostDiscoutProduct(ctx context.Context) (*([]Product), error) {
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
