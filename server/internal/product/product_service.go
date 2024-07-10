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

func (s *service) DisProd(c context.Context) (*DisProdRes, error) {
	p, err := s.Repository.GetMostDiscoutProduct(c)
	if err != nil {
		return nil, err
	}

	return &DisProdRes{
		data: p,
	}, nil
}
