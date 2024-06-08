package db

import (
	"errors"
	"gorm.io/gorm"
	"time"
)

type Reply struct {
	gorm.Model
	PostId      uint   `gorm:"not null"`
	AuthorId    uint   `gorm:"not null"`
	Content     string `gorm:"type:text; not null"`
	Floor       uint   `gorm:"not null"`
	ReplyTo     uint   `gorm:"default:null"`
	IsInvisible bool   `gorm:"default:False"`
	IsDeleted   bool   `gorm:"default:false"`
}

type ReplyGet struct {
	ID          uint
	CreatedTime time.Time
	UpdatedTime time.Time
	PostId      uint
	AuthorId    uint
	Content     string
	Floor       uint
	ReplyTo     uint
}

type ReplyRequest struct {
	PostId   uint
	AuthorId uint
	Content  string
	Floor    uint
	ReplyTo  uint
}

type ReplyCRUD struct{}

func (crud ReplyCRUD) CreateByObject(r *Reply) error {
	db, err := GetDatabaseInstance()
	if err != nil {
		return err
	}
	if r == nil {
		return errors.New("post is nil")
	}

	c := &PostCRUD{}
	post, err := c.FindById(r.PostId)
	if err != nil {
		return err
	}

	post.Floor++
	r.Floor = post.Floor

	err = c.UpdateByObject(post)
	if err != nil {
		return err
	}

	result := db.Create(r)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (crud ReplyCRUD) FindById(id uint) (*Reply, error) {
	db, err := GetDatabaseInstance()
	if err != nil {
		return nil, err
	}

	var res Reply
	result := db.First(&res, id)
	return &res, result.Error
}

func (crud ReplyCRUD) UpdateByObject(p *Reply) error {
	db, err := GetDatabaseInstance()
	if err != nil {
		return err
	}

	result := db.Save(&p)
	return result.Error
}

func (crud ReplyCRUD) UnsafeDeleteById(id uint) error {
	db, err := GetDatabaseInstance()
	if err != nil {
		return err
	}

	result := db.Delete(&Post{}, id)
	return result.Error
}

func (crud ReplyCRUD) SafeDeleteById(id uint) error {
	result, err := crud.FindById(id)
	if err != nil {
		return err
	}

	result.IsDeleted = true
	err = crud.UpdateByObject(result)
	if err != nil {
		return err
	}
	return nil
}

func (crud ReplyCRUD) FindAll() ([]Reply, error) {
	db, err := GetDatabaseInstance()
	if err != nil {
		return nil, err
	}

	var res []Reply
	result := db.Find(&res)
	return res, result.Error
}

func (crud ReplyCRUD) FindAllByPostId(postId uint) ([]Reply, error) {
	db, err := GetDatabaseInstance()
	if err != nil {
		return nil, err
	}

	var res []Reply
	result := db.Where("post_id = ?", postId).Find(&res)
	return res, result.Error
}

func (crud ReplyCRUD) FindAllByUserId(uint) ([]Reply, error) {
	return nil, nil
}
