import axios from "axios";
import {message} from "antd";

export function axiosUtil(_this, url1, url2, url3, url4, url5) {
    axios.all([axios.get(url1), axios.get(url2), axios.get(url3),
        axios.get(url4), axios.get(url5)])
        .then(axios.spread((res1, res2, res3, res4, res5) => {
            let weatherToday = {}, weatherNow = {}, weatherDayArray = [],
                weatherHourArray = [], lifeSuggestion = {}, airCondition = {}
            //处理今日（七天）的天气
            const {data: data1} = res1;
            const {code: code1, daily: daily1} = data1
            if (code1 !== '200')
                message.error('获取七天天气失败！错误码:' + code1)
            else {
                const {tempMin, tempMax, iconDay, iconNight, sunrise, sunset, moonPhase, moonPhaseIcon} = daily1[0]
                weatherToday = {
                    tempMin: tempMin, tempMax: tempMax,
                    iconDay: iconDay, iconNight: iconNight,
                    sunrise: sunrise, sunset: sunset, moonPhase: moonPhase,
                    moonPhaseIcon: moonPhaseIcon
                }
                weatherDayArray = daily1
            }
            //处理实时天气
            const {data: data2} = res2
            const {code: code2, now: now1} = data2
            if (code2 !== '200')
                message.error('获取实时天气失败！错误码:' + code2)
            else {
                const {temp, icon, text, windDir, windScale, humidity, vis} = now1
                weatherNow = {
                    temp: temp,
                    icon: icon,
                    text: text,
                    windDir: windDir,
                    windScale: windScale,
                    humidity: humidity,
                    vis: vis
                }
            }
            //处理24小时天气
            const {data: data3} = res3
            const {code: code3, hourly} = data3
            if (code3 !== '200')
                message.error('获取24小时天气失败！错误码:' + code3)
            else {
                weatherHourArray = hourly
            }
            //处理生活指数
            const {data: data4} = res4
            const {code: code4, daily: daily2} = data4
            if (code4 !== '200')
                message.error('获取生活指数失败！错误码:' + code4)
            else {
                const {category: clothes} = daily2[1]
                const {category: travel} = daily2[2]
                const {category: flu} = daily2[3]
                const {category: car} = daily2[0]
                lifeSuggestion = {clothes: clothes, travel: travel, flu: flu, car: car}
            }
            //处理空气质量
            const {data: data5} = res5
            const {code: code5, now: now2} = data5
            if (code5 !== '200')
                message.error('获取空气质量失败！错误码:' + code5)
            else {
                const {aqi, category} = now2
                console.log(aqi,category)
                let airConditionStyle = 'rgba(155, 255, 149, 0.6)'
                if (category === '良')
                    airConditionStyle = 'rgba(237,255,84,0.6)'
                else if (category === '轻度污染')
                    airConditionStyle = 'rgba(246,160,76,0.6)'
                else if (category === '中度污染')
                    airConditionStyle = 'rgba(252,24,24,0.6)'
                else if (category === '重度污染')
                    airConditionStyle = 'rgba(192,36,246,0.6)'
                else if (category === '严重污染')
                    airConditionStyle = 'rgba(103,27,27,0.6)'

                airCondition = {aqi: aqi, category: category, airConditionStyle: airConditionStyle}
            }
            //修改state，更新页面
            _this.setState({
                weatherToday, weatherDayArray, weatherNow,
                weatherHourArray, lifeSuggestion, airCondition
            })
        })).catch(err => {
        message.error(err.message)
    })
}