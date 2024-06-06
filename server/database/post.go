package database

import (
	"errors"
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Title       string `gorm:"not null"`
	AuthorName  string `gorm:"not null"`
	Content     string `gorm:"type:text;not null"`
	Floor       uint   `gorm:"not null"`
	IsLocked    bool   `gorm:"default:false"`
	IsDeleted   bool   `gorm:"default:false"`
	IsTop       bool   `gorm:"default:false"`
	IsInvisible bool   `gorm:"default:False"`
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
