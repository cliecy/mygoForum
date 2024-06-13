package scorecalculator

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"regexp"
)

var eappid = "AyixamYCAB7VbVwF2Z2Al_qIBldFnlfbsJvxotqhSpbcOUqehmeizt6AxRLsRPKPQ-5bsPPHepGazzadfJE2xa8oDToEQMuf2TaTwKwCUDoFIK-Tm3H4K5hJ93OGas4AKt0qAcyzSv7F0P2-WO16_3ywT8au5bmwftKrYB9wbPahyOgnrgdpmEVzCPLi_nkPwA~1"

// var crumb = "Av-0amYAi3Fco9e3MAE0cQ8W6djEPN8-3vslcYOmTciZ2wh_0ucLbPeg_72NJBOX2z0OHrmXk1RgT7u7o1U-TFIqPre1sjnc2HCH7ySXPb4AO8LAb5mNKJuXfE3pbrG3xrSAa2eq"

func cal() {
	// url := "https://map.yahoo.co.jp/proxy/search?query=%E6%96%B0%E5%AE%BF%E9%A7%85&mode=default&research=1&results=1&eappid=" + eappid + "crumb=" + crumb
	// fmt.Println(url)
	url := "https://map.yahoo.co.jp/proxy/route/v2/summary?from=139.7002466%2C35.6910874&to=139.6157241%2C35.6698848&fcode=22741&tcode=22906&fguidepoint=139.69911617%2C35.69141788%2C1&tguidepoint=139.61583793%2C35.67007645%2C1&date=202406131704&datetype=1&ptn=se%2Cal%2Cex%2Chb%2Clb%2Csr&sorttype=1&transitsort=0&carmode=2&eappid=" + eappid
	// url := "https://templa.yahooapis.jp/v1/templates/emg?eappid=" + eappid + "&device_id=pc&semg=true"
	// 设置请求体数据
	jsonData := []byte(`{"key": "value"}`)

	// 创建一个新的POST请求
	req, err := http.NewRequest("GET", url, bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Failed to create request:", err)
		return
	}

	// 设置请求头
	req.Header.Set("Content-Type", "application/json")

	// 创建HTTP客户端并发送请求
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Failed to send request:", err)
		return
	}
	defer resp.Body.Close()

	// 读取响应体
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Failed to read response:", err)
		return
	}

	// 打印响应内容
	fmt.Println("Response:", string(body))
	fmt.Println(resp.StatusCode)
}

func GeteAppid() {
	myurl := "https://map.yahoo.co.jp/route/train?from=%E6%96%B0%E5%AE%BF%E9%A7%85&to=%E5%85%AB%E5%B9%A1%E5%B1%B1%E9%A7%85"
	jsonData := []byte(`{"key": "value"}`)

	// 创建一个新的GET请求
	req, err := http.NewRequest("GET", myurl, bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Failed to create request:", err)
		return
	}

	// 设置请求头
	req.Header.Set("Content-Type", "application/json")

	// 创建HTTP客户端并发送请求
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Failed to send request:", err)
		return
	}
	defer resp.Body.Close()

	// 读取响应体
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Failed to read response:", err)
		return
	}

	// 打印响应内容
	fmt.Println("Response:", string(body))
	fmt.Println(resp.StatusCode)

	// 使用正则表达式提取 eappid 的值
	re := regexp.MustCompile(`"eappid":"(.*?)"`)
	match := re.FindStringSubmatch(string(body))
	if len(match) > 1 {
		eappid := match[1]
		fmt.Println("Extracted eappid:", eappid)
	} else {
		fmt.Println("eappid not found in the response")
	}
}

func main() {
	GeteAppid()
}
