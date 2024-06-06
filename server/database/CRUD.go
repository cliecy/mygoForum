package database

type CRUD[T any] interface {
	CreateByObject(obj *T) error
	FindById(id uint) (*T, error)
	UpdateByObject(p *T) error
	DeleteById(id uint) error
	FindAll() ([]T, error)
}
