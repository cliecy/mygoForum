package router

import (
	"github.com/gin-gonic/gin"
	"mygoForum/db"
	"strconv"
)

func GetAllPosts(c *gin.Context) {
	crud := &db.PostCRUD{}
	result, err := crud.FindAll()
	if err != nil {
		c.JSON(500, gin.H{})
	}
	c.JSON(200, result)
}

func GetAllReplies(c *gin.Context) {
	crud := &db.ReplyCRUD{}
	postId, err := strconv.Atoi(c.Param("PostId"))
	if err != nil {
		c.JSON(500, gin.H{"error": "postId is invalid"})
	}
	if postId <= 0 {
		c.JSON(500, gin.H{"error": "postId is invalid"})
	}

	result, err := crud.FindAllByPostId(uint(postId))
	if err != nil {
		c.JSON(404, gin.H{"error": "post not found"})
	}
	c.JSON(200, result)
}
