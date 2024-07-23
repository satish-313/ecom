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

func (r *repository) categoryWithProd(ctx context.Context, offset string) (*[]Category, error) {
	var cs []Category

	query := `WITH x as (SELECT p.category_id AS category_id ,p.product_id AS prid ,COUNT(*) AS c FROM prodcategory p GROUP BY p.category_id ORDER BY c DESC LIMIT 4 OFFSET $1)
		SELECT c.category_id,c.name FROM category c JOIN x ON c.category_id = x.category_id  `
	rows, err := r.db.QueryContext(ctx, query, offset)

	if err != nil {
		return nil, echo.NewHTTPError(http.StatusInternalServerError, "query error")
	}
	defer rows.Close()

	for rows.Next() {
		var p Category
		err = rows.Scan(&p.CategoryId, &p.Name)
		cs = append(cs, p)
		if err != nil {
			return nil, echo.NewHTTPError(http.StatusInternalServerError, err)
		}
	}
	err = rows.Err()
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusInternalServerError, "for loop error")
	}

	return &cs, nil
}

func (r *repository) getProdById(ctx context.Context, id int) (*Product, error) {
	var p Product
	query := `SELECT * FROM products p WHERE p.product_id  = $1`

	err := r.db.QueryRowContext(ctx, query, id).Scan(&p.Product_id, &p.Title, &p.Description, &p.Price, &p.Discount_percentage, &p.Stock, &p.Brand, &p.Weight, &p.Dimensions, &p.Shipping_information, &p.Return_policy, &p.Thumbnail)
	if err != nil {
		return nil, echo.NewHTTPError(http.StatusInternalServerError, "query error")
	}
	return &p, nil
}
