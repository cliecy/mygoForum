package router

import (
	"github.com/gin-gonic/gin"
	"mygoForum/db"
)

func GetAllPosts(c *gin.Context) {
	var crud db.CRUD[db.Post] = &db.PostCRUD{}
	result, err := crud.FindAll()
	if err != nil {
		c.JSON(500, gin.H{})
	}
	c.JSON(200, result)
}
