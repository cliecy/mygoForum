package main

import (
	"mygoForum/router"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func main() {
	r := gin.Default()

	r.GET("/", router.GetAllPosts)
	r.GET("/:PostId", router.GetAllReplies)

	r.Run(":8080")
}
