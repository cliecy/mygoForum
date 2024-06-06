package database

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"sync"
)

type DBConfig struct {
	Host     string
	Port     int
	User     string
	Password string
	DBName   string
	SSLMode  string
	TimeZone string
}

var (
	dbInstance *gorm.DB
	dbOnce     sync.Once
	dbErr      error
)

func GetDatabaseInstance() (*gorm.DB, error) {
	Config := DBConfig{
		Host:     "localhost",
		Port:     5432,
		User:     "apple",
		Password: "123456",
		DBName:   "postgres",
		SSLMode:  "disable",
		TimeZone: "Asia/Tokyo",
	}
	dbOnce.Do(func() {
		dsn := fmt.Sprintf("host=%v user=%v password=%v dbname=%v port=%v sslmode=%v TimeZone=%v",
			Config.Host, Config.User, Config.Password, Config.DBName, Config.Port, Config.SSLMode, Config.TimeZone)
		dbInstance, dbErr = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	})
	return dbInstance, dbErr
}
