package database

import "gorm.io/gorm"

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
