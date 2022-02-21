import React, {Component} from 'react';
import './WeatherDays.css'

class WeatherDays extends Component {
    render() {
        return (
            <div className='weatherDaysContainer'>
                <ul>
                    <ul className="weatherDaysHeader">
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期</li>
                        <li>温度</li>
                        <li>日间/夜间天气</li>
                        <li>日间风力</li>
                        <li>夜间风力</li>
                        <li>相对湿度</li>
                        <li>能见度</li>
                    </ul>
                    {this.props.weatherDayArray.map((value,idx)=>{
                        const {fxDate,tempMin,tempMax,iconDay,iconNight,windDirDay,windScaleDay,
                            windDirNight,windScaleNight,humidity,vis}=value
                        return(
                            <li key={idx}>
                                <ul className="weatherDaysDetail">
                                    <li>{fxDate}</li>
                                    <li>{tempMin}~{tempMax}℃</li>
                                    <li>
                                        <img src={"/Icons/" + iconDay + ".svg"} alt="Loading" width="40" height="40"/>
                                        &nbsp;&nbsp;
                                        <img src={"/Icons/" + iconNight + ".svg"} alt="Loading" width="40" height="40"/>
                                    </li>
                                    <li>{windDirDay}({windScaleDay})</li>
                                    <li>{windDirNight}({windScaleNight})</li>
                                    <li>&nbsp;&nbsp;{humidity}%</li>
                                    <li>{vis}km</li>
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default WeatherDays;