package db

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

type Database struct {
	db *sql.DB
}

func InitDb() (*Database, error) {
	dp, err := sql.Open("sqlite3", "./db/ecom.db")
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
