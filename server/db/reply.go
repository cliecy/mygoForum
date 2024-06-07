package db

import (
	"errors"
	"gorm.io/gorm"
)

type Reply struct {
	gorm.Model
	PostId      uint   `gorm:"not null"`
	Author      string `gorm:"not null"`
	Content     string `gorm:"type:text; not null"`
	Floor       uint   `gorm:"not null"`
	ReplyTo     uint   `gorm:"default:null"`
	IsInvisible bool   `gorm:"default:False"`
	IsDeleted   bool   `gorm:"default:false"`
}

type ReplyCRUD struct{}

func (re ReplyCRUD) CreateByObject(r *Reply) error {
	db, err := GetDatabaseInstance()
	if err != nil {
		return err
	}

	if r != nil {
		result := db.Create(r)
		return result.Error
	} else {
		return errors.New("post is nil")
	}
}

func (re ReplyCRUD) FindById(id uint) (*Reply, error) {
	db, err := GetDatabaseInstance()
	if err != nil {
		return nil, err
	}

	var res Reply
	result := db.First(&res, id)
	return &res, result.Error
}

func (re ReplyCRUD) UpdateByObject(p *Reply) error {
	db, err := GetDatabaseInstance()
	if err != nil {
		return err
	}

	result := db.Save(&p)
	return result.Error
}

func (re ReplyCRUD) DeleteById(id uint) error {
	db, err := GetDatabaseInstance()
	if err != nil {
		return err
	}

	result := db.Delete(&Post{}, id)
	return result.Error
}

func (re ReplyCRUD) FindAll() ([]Reply, error) {
	db, err := GetDatabaseInstance()
	if err != nil {
		return nil, err
	}

	var res []Reply
	result := db.Find(&res)
	return res, result.Error
}

func (re ReplyCRUD) FindAllByPostId(postId uint) ([]Reply, error) {
	db, err := GetDatabaseInstance()
	if err != nil {
		return nil, err
	}

	var res []Reply
	result := db.Where("post_id = ?", postId).Find(&res)
	return res, result.Error
}

func (re ReplyCRUD) FindAllByUserId(uint) ([]Reply, error) {
	return nil, nil
}
