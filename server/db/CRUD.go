package db

type CRUD[T any] interface {
	CreateByObject(*T) error
	FindById(uint) (*T, error)
	UpdateByObject(*T) error
	DeleteById(uint) error
	FindAll() ([]T, error)
}
