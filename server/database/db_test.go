package database

import (
	"fmt"
	"testing"
)

/*
func TestCreate(t *testing.T) {
	var crud CRUD[Post] = PostCRUD{}
	db, _ := GetDatabaseInstance()
	db.AutoMigrate(&Post{})
	p := &Post{
		Title:       "Hello, world",
		AuthorName:  "apple",
		Content:     "123456",
		Floor:       1,
		IsLocked:    false,
		IsDeleted:   false,
		IsTop:       false,
		IsInvisible: false,
	}
	var err error
	if p != nil {
		err = crud.CreateByObject(p)
	}
	if err != nil {
		fmt.Println(err)
	}
}
*/

/*
func TestFindById(t *testing.T) {
	var crud CRUD[Post] = PostCRUD{}

	res, _ := crud.FindById(1)
	fmt.Println(res)
}
*/

/*
func TestUpdateByObject(t *testing.T) {
	var crud CRUD[Post] = PostCRUD{}
	p := &Post{
		Title:       "goodbye",
		AuthorName:  "fuck",
		Content:     "?",
		Floor:       1,
		IsLocked:    false,
		IsDeleted:   false,
		IsTop:       false,
		IsInvisible: false,
	}
	p.ID = 1
	res, _ := crud.FindById(1)
	fmt.Println(res)
}
*/

func TestFindAll(t *testing.T) {
	var op CRUD[Post] = PostCRUD{}
	res, err := op.FindAll()
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res)
}
