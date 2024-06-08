package db

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	UserName      string    `gorm:"unique;not null"`
	PassWord      string    `gorm:"not null"`
	Gender        string    `gorm:"not null"`
	Motto         string    `gorm:"not null"`
	RegisterTime  time.Time `gorm:"not null"`
	LastLoginTime time.Time `gorm:"not null"`
	Avatar        string    `gorm:"default:null"`
	NumofShares   uint      `gorm:"default:0"`
	UserClass     uint      `gorm:"default:0"`
}

type UserGet struct {
	UserName      string
	Gender        string
	Motto         string
	RegisterTime  time.Time
	LastLoginTime time.Time
	Avatar        string
	NumofShares   uint
	UserClass     uint
}

type UserLogin struct {
	UserName string
	Password string
}

type