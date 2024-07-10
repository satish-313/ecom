package db

import (
	"database/sql"

	"github.com/labstack/echo/v4"
	_ "github.com/mattn/go-sqlite3"
)

type Database struct {
	db *sql.DB
}

// QueryContext implements product.DBtx.
func (d *Database) QueryContext(echo.Context, string, ...interface{}) (*sql.Rows, error) {
	panic("unimplemented")
}

// QueryRowContext implements product.DBtx.
func (d *Database) QueryRowContext(echo.Context, string, ...interface{}) *sql.Row {
	panic("unimplemented")
}

func InitDb() (*Database, error) {
	dp, err := sql.Open("sqlite3", "./db/ecom.db")
	if err != nil {
		return nil, err
	}
	err = dp.Ping()
	if err != nil {
		return nil, err
	}

	return &Database{db: dp}, nil
}

func (d *Database) GetDb() *sql.DB {
	return d.db
}

func (d *Database) Close() {
	d.db.Close()
}
