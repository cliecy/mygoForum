package main

import (
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"mygoForum/router"
)

func main() {
	r := gin.Default()

	r.GET("/", router.GetAllPosts)

	r.Run(":8000")
}
