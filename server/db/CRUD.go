package db

type InterfaceOfPostCRUD interface {
	CreateByObject(*Post) error
	FindById(uint) (*Post, error)
	UpdateByObject(*Post) error
	UnsafeDeleteById(uint) error
	SafeDeleteById(uint) error
	FindAll() ([]Post, error)
	FindAllOrdered() ([]Post, error)
}

type InterfaceOfReplyCRUD interface {
	CreateByObject(*Reply) error
	FindById(uint) (*Reply, error)
	UpdateByObject(*Reply) error
	UnsafeDeleteById(uint) error
	SafeDeleteById(uint) error
	FindAll() ([]Reply, error)
	FindAllByPostId(uint) ([]Reply, error)
	FindAllByUserId(uint) ([]Reply, error)
}
