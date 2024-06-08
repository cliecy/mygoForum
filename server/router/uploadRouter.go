package router

import (
	"github.com/gin-gonic/gin"
	"time"
)

func UploadImages(c *gin.Context) {
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(500, gin.H{"error": err})
		return
	}
	now := time.Now()
	err = c.SaveUploadedFile(file, "./static/images/"+file.Filename+"_"+now.Format("2006-01-02 15:04:05"))
	if err != nil {
		c.JSON(500, gin.H{"error": err})
		return
	}
	c.JSON(200, gin.H{"status": "File Uploaded"})
	return
}
