package database

import "gorm.io/gorm"

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

type Reply struct {
	gorm.Model
	PostId      uint   `gorm:"not null"`
	Author      string `gorm:"not null"`
	Content     string `gorm:"type:text;not null"`
	Floor       uint   `gorm:"not null"`
	ReplyTo     uint   `gorm:"not null"`
	IsInvisible bool   `gorm:"default:False"`
	IsDeleted   bool   `gorm:"default:false"`
}

type User struct{}
