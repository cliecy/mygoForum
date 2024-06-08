package main

import (
	"fmt"
	"mygoForum/router"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func main() {
	r := gin.Default()

	post := r.Group("/posts")
	{
		post.GET("", router.GetAllPosts)
		post.GET("/:PostId", router.GetAllReplies)
		post.POST("", router.CreatePost)
		post.POST("/:PostId", router.CreateReply)
	}

	err := r.Run(":8000")
	if err != nil {
		fmt.Println(err)
	}
}
