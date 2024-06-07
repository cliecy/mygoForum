package db

import (
	"fmt"
	"testing"
)

/*
func TestCreateReply(t *testing.T) {
	var crud = ReplyCRUD{}
	db, _ := GetDatabaseInstance()
	db.AutoMigrate(&Reply{})
	p := &Reply{
		PostId:  1,
		Author:  "yamanashi",
		Content: "hello world",
		Floor:   2,
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
	var crud PostCRUD[Post] = PostCRUD{}

	res, _ := crud.FindById(1)
	fmt.Println(res)
}
*/

/*
func TestUpdateByObject(t *testing.T) {
	var crud PostCRUD[Post] = PostCRUD{}
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

/*
func TestFindAll(t *testing.T) {
	var op = PostCRUD{}
	res, err := op.FindAll()
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res)
}
*/

/*
func TestFindAllReply(t *testing.T) {
	var op = ReplyCRUD{}
	res, err := op.FindAll()
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res)
}
*/

func TestFindAllReplyByPostId(t *testing.T) {
	var op = ReplyCRUD{}
	res, err := op.FindAllByPostId(1)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(res)
}
