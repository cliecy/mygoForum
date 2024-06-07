package db

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	UserName      string    `gorm:"not null"`
	PassWord      string    `gorm:"not null"`
	Gender        string    `gorm:"not null"`
	Motto         string    `gorm:"not null"`
	LastLoginTime time.Time ``
}
