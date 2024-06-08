package router

import (
	"mygoForum/db"
	"time"

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
		UserName:      Register.UserName,
		PassWord:      Register.Password,
		LastLoginTime: time.Now(),
	}

	err := crud.CreateByObject(&newuser)
	if err != nil {
		c.JSON(500, gin.H{"err": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "User registered successfully"})
}

func Login(c *gin.Context) {
	crud := &db.UserCRUD{}
	var Login db.UserLogin
	if err := c.ShouldBindJSON(&Login); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	user, err := crud.GetUserByName(Login.UserName)
	if err != nil {
		c.JSON(404, gin.H{"error": "Invalid username or password"})
		return
	}

	if user.PassWord != Login.Password {
		c.JSON(404, gin.H{"error": "Invalid username or password"})
		return
	}

	c.JSON(200, gin.H{"message": "Login successful"})
}
