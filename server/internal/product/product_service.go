package product

import (
	"context"
	"time"
)

type service struct {
	Repository
	timeout time.Duration
}

func NewService(repository Repository) Service {
	return &service{
		repository,
		time.Duration(5) * time.Second,
	}
}

func (s *service) disProd(c context.Context) (*[]Product, error) {
	p, err := s.Repository.getMostDiscoutProduct(c)
	if err != nil {
		return nil, err
	}

	return p, nil
}

func (s *service) categoryProduct(c context.Context, category string, offset string) (*[]Product, bool, error) {
	p, err := s.Repository.categoryProduct(c, category, offset)
	if err != nil {
		return nil, false, err
	}
	r := *p
	isNext := false

	if len(*p) > 8 {
		isNext = true
		r = (*p)[:8]
	}

	return &r, isNext, nil
}
