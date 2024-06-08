package db

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	UserName      string    `gorm:"unique;not null"`
	PassWord      string    `gorm:"not null"`
	Gender        string    `gorm:"not null"`
	Motto         string    `gorm:"not null"`
	LastLoginTime time.Time `gorm:"not null"`
	Avatar        string    `gorm:"default:null"`
	NumofShares   uint      `gorm:"default:0"`
	UserClass     uint      `gorm:"default:0"`
}

type UserGet struct {
	ID            uint
	UserName      string
	Gender        string
	Motto         string
	CreatedTime   time.Time
	LastLoginTime time.Time
	Avatar        string
	NumofShares   uint
	UserClass     uint
}

type UserLogin struct {
	UserName string
	Password string
}

type UserCRUD struct{}

func (crud UserCRUD) CreateByObject(u *User) error {
	db, err := GetDatabaseInstance()
	if err != nil {
		return err
	}
	if u == nil {
		return errors.New("User not exists")
	}
	result := db.Create(u)
	if result.Error != nil {
		return result.Error
	}

	return result.Error
}
