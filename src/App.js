import React from 'react'
import "./Component/Header/Header.css"
import Header from "./Component/Header/Header";
import {message, notification} from "antd";
import WeatherNow from "./Component/WeatherNow/WeatherNow";
import axios from "axios";
import {axiosUtil} from "./Utils/axiosUtil";
import WeatherHours from "./Component/WeatherHours/WeatherHours";
import WeatherDays from "./Component/WeatherDays/WeatherDays";
import LifeSuggestion from "./Component/LifeSuggesion/LifeSuggestion";
import Footer from "./Component/Footer/Footer";

class APP extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            weatherToday: {}, weatherNow: {}, weatherDayArray: [],
            weatherHourArray: [], lifeSuggestion: {}, airCondition: {}
        }
        //API-KEY
        this.locationKey = "9a82a9ab4f7f40028bd6603b14a5339a"
        this.weatherDayKey = "968402409ab94f48a7ab262ccf3f8498"
        this.weatherNowKey = "216d94500fb04c6a93e5b5c43bb05170"
        this.weatherHourKey = "d27d314d221647c8b976a037757f72aa"
        this.lifeSuggestionKey = "961c43a88b4e4e5cb73b3ae9c53c258e"
        this.airConditionKey = "1235913199884bf0bd4e320c4d66a68c"
        this.warningKey = "adc36118b91848d9890abc6483519bb5"
    }

    //初始化时读取南京市栖霞区的天气数据
    componentDidMount() {
        notification['info']({
            message: 'Welcome',
            description:
                '您可以在右上角选择需要查询的地点，之后我们会自动刷新页面'
        })

        //请求7天天气
        let url1 = "https://devapi.qweather.com/v7/weather/7d?location=118.88,32.11" +
            "&key=" + this.weatherDayKey
        //请求实时天气
        let url2 = "https://devapi.qweather.com/v7/weather/now?location=118.88,32.11" +
            "&key=" + this.weatherNowKey
        //请求24小时天气
        let url3 = "https://devapi.qweather.com/v7/weather/24h?location=118.88,32.11" +
            "&key=" + this.weatherHourKey
        //请求生活指数
        let url4 = "https://devapi.qweather.com/v7/indices/1d?location=118.88,32.11" +
            "&key=" + this.lifeSuggestionKey + "&type=2,3,6,9"
        //请求空气质量
        let url5 = "https://devapi.qweather.com/v7/air/now?location=118.88,32.11" +
            "&key=" + this.airConditionKey

        axiosUtil(this, url1, url2, url3, url4, url5)
    }

    //处理地点变化，统一分发状态给子组件
    handleLocationChange = (locationArray) => {
        let location, adm

        if (locationArray.length === 3) {
            location = locationArray[2]
            adm = locationArray[1]
        } else if (locationArray.length === 2) {
            location = locationArray[1]
            adm = locationArray[0]
        } else {
            location = locationArray[0]
            adm = ''
        }
        //获取经纬度存入实例中
        let url = "https://geoapi.qweather.com/v2/city/lookup?location=" + location + "&adm=" + adm + "&key=" + this.locationKey
        axios.get(url).then((res) => {
            const {data: data1} = res
            const {code: code1, location} = data1
            const {lon, lat} = location[0]
            if (code1 !== '200')
                message.error('获取定位失败！状态码：' + code1)
            else {
                //接着处理其他并发请求
                //请求7天天气
                let url1 = "https://devapi.qweather.com/v7/weather/7d?location=" + lon + "," + lat + "&key=" + this.weatherDayKey
                //请求实时天气
                let url2 = "https://devapi.qweather.com/v7/weather/now?location=" + lon + "," + lat + "&key=" + this.weatherNowKey
                //请求24小时天气
                let url3 = "https://devapi.qweather.com/v7/weather/24h?location=" + lon + "," + lat + "&key=" + this.weatherHourKey
                //请求生活指数
                let url4 = "https://devapi.qweather.com/v7/indices/1d?location=" + lon + "," + lat + "&key=" + this.lifeSuggestionKey + "&type=2,3,6,9"
                //请求空气质量
                let url5 = "https://devapi.qweather.com/v7/air/now?location="+ lon + "," + lat +
                    "&key=" + this.airConditionKey

                axiosUtil(this, url1, url2, url3, url4, url5)
            }
        }).catch(err => {
            message.error(err.message)
        })


    }

    render() {
        const {weatherToday} = this.state
        const headerProps = {
            locationChange: this.handleLocationChange, weatherToday
        }

        return (
            <div>
                <Header {...headerProps}/>
                <WeatherNow weatherNow={this.state.weatherNow}
                            weatherToday={this.state.weatherToday}
                            airCondition={this.state.airCondition}/>
                <WeatherHours weatherHourArray={this.state.weatherHourArray}/>
                <WeatherDays weatherDayArray={this.state.weatherDayArray}/>
                <LifeSuggestion lifeSuggesion={this.state.lifeSuggestion}/>
                <Footer/>
            </div>
        )
    }
}

export default APP