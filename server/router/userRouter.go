package router

import (
	"mygoForum/db"

	"github.com/gin-gonic/gin"
)

func GetAllPosts(c *gin.Context) {
	crud := &db.PostCRUD{}
	result, err := crud.FindAll()
	if err != nil {
		c.JSON(500, gin.H{})
		return
	}
	c.JSON(200, result)
	return
}
