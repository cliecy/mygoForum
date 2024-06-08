package db

// func TestCreatePost(t *testing.T) {
// 	var crud = PostCRUD{}
// 	db, _ := GetDatabaseInstance()
// 	db.AutoMigrate(&Post{})
// 	p := &Post{
// 		Title:    "Tessdssssssdt Post",
// 		AuthorId: 1,
// 		Content:  "Test Posdassssdsdadasasdst",
// 	}
// 	var err error
// 	if p != nil {
// 		err = crud.CreateByObject(p)
// 	}
// 	if err != nil {
// 		fmt.Println(err)
// 	}
// }

// func TestCreateUser(t *testing.T) {
// 	var crud = UserCRUD{}
// 	db, _ := GetDatabaseInstance()
// 	db.AutoMigrate(&User{})
// 	p := &User{
// 		UserName:      "leo",
// 		PassWord:      "123456",
// 		LastLoginTime: time.Now(),
// 	}
// 	var err error
// 	if p != nil {
// 		err = crud.CreateByObject(p)
// 	}
// 	if err != nil {
// 		fmt.Println(err)
// 	}
// }

//func TestCreateReply(t *testing.T) {
//	var crud = ReplyCRUD{}
//	db, _ := GetDatabaseInstance()
//	db.AutoMigrate(&Reply{})
//	p := &Reply{
//		PostId:   1,
//		AuthorId: 1,
//		Content:  "hello world",
//	}
//	var err error
//	if p != nil {
//		err = crud.CreateByObject(p)
//	}
//	if err != nil {
//		fmt.Println(err)
//	}
//}

/*
func TestFindPostById(t *testing.T) {
	var crud  = PostCRUD{}

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
func TestFindAllPost(t *testing.T) {
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

// func TestFindAllReplyByPostId(t *testing.T) {
// 	var op = ReplyCRUD{}
// 	res, err := op.FindAllByPostId(1)
// 	if err != nil {
// 		fmt.Println(err)
// 		return
// 	}
// 	fmt.Println(res)
// }
