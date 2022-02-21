import React, {Component} from 'react';
import './WeatherHours.css'

class WeatherHours extends Component {
    render() {
        return (
            <div className='weatherHoursContainer'>
                <ul>
                    {this.props.weatherHourArray.map((value, idx) => {
                        //提取需要的数据
                        const {fxTime, temp, icon, text, windDir, windScale} = value
                        const time = fxTime.substring(11, 16)
                        //只是简单罗列数据，所以直接将idx作为key
                        return (
                            <li key={idx}>
                                {time}
                                <img src={"/Icons/" + icon + ".svg"} alt="Loading" width="40" height="40"/>
                                <ul className="weatherHourDes">
                                    <li>{temp}℃</li>
                                    <li>{text}</li>
                                    <li>{windDir}</li>
                                    <li>{windScale}级</li>
                                </ul>
                            </li>)
                    },)}
                </ul>
            </div>
        );
    }
}

export default WeatherHours;