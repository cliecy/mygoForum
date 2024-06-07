package db

type InterfaceOfPostCRUD interface {
	CreateByObject(*Post) error
	FindById(uint) (*Post, error)
	UpdateByObject(*Post) error
	DeleteById(uint) error
	FindAll() ([]Post, error)
}

type InterfaceOfReplyCRUD interface {
	CreateByObject(*Reply) error
	FindById(uint) (*Reply, error)
	UpdateByObject(*Reply) error
	DeleteById(uint) error
	FindAll() ([]Reply, error)
	FindAllByPostId(uint) ([]Reply, error)
	FindAllByUserId(uint) ([]Reply, error)
}
