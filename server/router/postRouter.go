package router

import (
	"fmt"
	"mygoForum/db"
	"strconv"

	"github.com/gin-gonic/gin"
)

type PostData[T any] struct {
	Data    []T  `json:"data"`
	Page    int  `json:"page"`
	Success bool `json:"success"`
	Total   int  `json:"total"`
}

func GetAllPosts(c *gin.Context) {
	crud := &db.PostCRUD{}
	result, err := crud.FindAllOrdered()
	if err != nil {
		c.JSON(500, gin.H{"error": "Cannot Find Posts"})
		return
	}
	posts := make([]db.PostGet, len(result))
	for i := range posts {
		u := &db.UserCRUD{}
		user, err := u.GetUserById(result[i].AuthorId)
		if err != nil {
			c.JSON(500, gin.H{"error": "Cannot Find User"})
			return
		}

		posts[i] = db.PostGet{
			ID:            result[i].ID,
			CreatedTime:   result[i].CreatedAt,
			UpdatedTime:   result[i].UpdatedAt,
			Title:         result[i].Title,
			AuthorId:      result[i].AuthorId,
			AuthorName:    user.UserName,
			Gender:        user.Gender,
			Motto:         user.Motto,
			LastLoginTime: user.LastLoginTime,
			Avatar:        user.Avatar,
			NumOfPosts:    user.NumOfShares,
			UserClass:     user.UserClass,
			Content:       result[i].Content,
			Floor:         result[i].Floor,
			IsLocked:      result[i].IsLocked,
		}
	}
	data := PostData[db.PostGet]{
		Data:    posts,
		Page:    0,
		Success: true,
		Total:   len(result),
	}
	fmt.Println(data)
	c.JSON(200, data)
	return
}

func GetAllReplies(c *gin.Context) {
	crud := &db.ReplyCRUD{}
	postId, err := strconv.Atoi(c.Param("PostId"))
	if err != nil {
		c.JSON(500, gin.H{"error": "postId is invalid"})
		return
	}
	if postId <= 0 {
		c.JSON(500, gin.H{"error": "postId is invalid"})
		return
	}

	result, err := crud.FindAllByPostId(uint(postId))
	if err != nil {
		c.JSON(404, gin.H{"error": "post not found"})
		return
	}
	replies := make([]db.ReplyGet, len(result))
	for i := range replies {
		u := &db.UserCRUD{}
		user, err := u.GetUserById(result[i].AuthorId)
		if err != nil {
			c.JSON(500, gin.H{"error": "Cannot Find User"})
			return
		}

		replies[i] = db.ReplyGet{
			ID:            result[i].ID,
			CreatedTime:   result[i].CreatedAt,
			UpdatedTime:   result[i].UpdatedAt,
			PostId:        result[i].PostId,
			AuthorId:      result[i].AuthorId,
			AuthorName:    user.UserName,
			Gender:        user.Gender,
			Motto:         user.Motto,
			LastLoginTime: user.LastLoginTime,
			Avatar:        user.Avatar,
			NumOfPosts:    user.NumOfShares,
			UserClass:     user.UserClass,
			Content:       result[i].Content,
			Floor:         result[i].Floor,
			ReplyTo:       result[i].ReplyTo,
		}
	}

	data := PostData[db.ReplyGet]{
		Data:    replies,
		Page:    0,
		Success: true,
		Total:   len(result),
	}
	c.JSON(200, data)
	return
}

func CreatePost(c *gin.Context) {
	p := db.PostCRUD{}
	var post db.PostRequest
	err := c.BindJSON(&post)

	if err != nil {
		c.JSON(500, gin.H{"error": "Format of request body is invalid"})
		return
	}

	newPost := &db.Post{
		Title:    post.Title,
		AuthorId: post.AuthorId,
		Content:  post.Content,
		Floor:    1,
	}
	err = p.CreateByObject(newPost)
	if err != nil {
		c.JSON(500, gin.H{"error": "Cannot create post now"})
		return
	}

	c.JSON(200, gin.H{"Success": true})
	return
}

func CreateReply(c *gin.Context) {
	r := db.ReplyCRUD{}
	var reply db.ReplyRequest
	err := c.BindJSON(&reply)
	if err != nil {
		c.JSON(500, gin.H{"error": "Format of request body is invalid"})
		return
	}
	newReply := &db.Reply{
		PostId:   reply.PostId,
		AuthorId: reply.AuthorId,
		Content:  reply.Content,
		ReplyTo:  reply.ReplyTo,
	}

	err = r.CreateByObject(newReply)
	if err != nil {
		c.JSON(500, gin.H{"error": "Cannot create reply"})
		return
	}
	c.JSON(200, gin.H{"Success": true})
	return
}
