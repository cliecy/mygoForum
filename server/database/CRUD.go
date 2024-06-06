package database

import "errors"

type CRUD[T any] interface {
	CreateByObject(obj *T) error
	FindById(id uint) (*T, error)
	UpdateByObject(p *Post) error
	DeleteById(id uint) error
	FindAll() ([]Post, error)
}

type PostCRUD struct{}

func (crud PostCRUD) CreateByObject(p *Post) error {
	db, err := GetDatabaseInstance()
	if err != nil {
		return err
	}

	if p != nil {
		result := db.Create(p)
		return result.Error
	} else {
		return errors.New("post is nil")
	}
}

func (crud PostCRUD) FindById(id uint) (*Post, error) {
	db, err := GetDatabaseInstance()
	if err != nil {
		return nil, err
	}

	var res Post
	result := db.First(&res, id)
	return &res, result.Error
}

func (crud PostCRUD) FindAll() ([]Post, error) {
	db, err := GetDatabaseInstance()
	if err != nil {
		return nil, err
	}

	var res []Post
	result := db.Find(&res)
	return res, result.Error
}

func (crud PostCRUD) UpdateByObject(p *Post) error {
	db, err := GetDatabaseInstance()
	if err != nil {
		return err
	}

	result := db.Save(&p)
	return result.Error
}

func (crud PostCRUD) DeleteById(id uint) error {
	db, err := GetDatabaseInstance()
	if err != nil {
		return err
	}

	result := db.Delete(&Post{}, id)
	return result.Error
}
