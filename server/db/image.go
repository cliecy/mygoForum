package db

import "gorm.io/gorm"

type Image struct {
	gorm.Model
	MD5    string
	Base64 string
}
