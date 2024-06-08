package router

import (
	"mygoForum/db"

	"github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {
	crud := &db.UserCRUD{}
	var Register db.UserLogin
	if err := c.ShouldBindJSON(&Register); err != nil {
		c.JSON(500, gin.H{"err": err.Error()})
		return
	}
	newuser := db.User{
		UserName: Register.UserName,
		PassWord: Register.Password,
	}

	err := crud.CreateByObject(&newuser)
	if err != nil {
		c.JSON(500, gin.H{"err": err.Error()})
		return
	}

	c.JSON(201, gin.H{"message": "User registered successfully"})
	return
}
