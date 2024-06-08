package router

import (
	"github.com/gin-gonic/gin"
	"mygoForum/db"
	"strconv"
)

func GetAllPosts(c *gin.Context) {
	crud := &db.PostCRUD{}
	result, err := crud.FindAllOrdered()
	if err != nil {
		c.JSON(500, gin.H{"error": "Cannot Find Posts"})
		return
	}
	posts := make([]db.PostGet, len(result))
	for i := range posts {
		posts[i] = db.PostGet{
			ID:          result[i].ID,
			CreatedTime: result[i].CreatedAt,
			UpdatedTime: result[i].UpdatedAt,
			Title:       result[i].Title,
			AuthorId:    result[i].AuthorId,
			Content:     result[i].Content,
			Floor:       result[i].Floor,
			IsLocked:    result[i].IsLocked,
		}
	}
	c.JSON(200, posts)
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
		replies[i] = db.ReplyGet{
			ID:          result[i].ID,
			CreatedTime: result[i].CreatedAt,
			UpdatedTime: result[i].UpdatedAt,
			PostId:      result[i].PostId,
			AuthorId:    result[i].AuthorId,
			Content:     result[i].Content,
			Floor:       result[i].Floor,
			ReplyTo:     result[i].ReplyTo,
		}
	}

	c.JSON(200, result)
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

	c.JSON(200, gin.H{"success": true})
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
	c.JSON(200, gin.H{"success": true})
	return
}
