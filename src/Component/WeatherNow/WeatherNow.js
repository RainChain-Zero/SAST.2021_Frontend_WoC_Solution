import React, {Component} from 'react';
import './WeatherNow.css'

class WeatherNow extends Component {
    render() {
        return (
            <div className='weatherTodayContainer'>
                <div className='weatherTodayTemp'>
                    <strong>
                        {this.props.weatherNow.temp}
                    </strong>
                    <span>
                        ℃
                    </span>
                </div>
                <div className="weatherNowDesc">
                    <img src={"/Icons/" + this.props.weatherNow.icon + ".svg"} alt="Loading" width="100"
                         height="100"/>&nbsp;
                    <div>
                        <span>{this.props.weatherNow.text}&nbsp;&nbsp;</span>
                        <span>{this.props.weatherNow.windDir}&nbsp;&nbsp;</span>
                        <span>{this.props.weatherNow.windScale}级</span>
                    </div>
                </div>
                <div className='airCondition' style={{'backgroundColor': this.props.airCondition.airConditionStyle}}>
                    <span className='airConditionCategory'>
                        {this.props.airCondition.category}
                    </span>
                    <span className='airConditionAqi'>
                        {this.props.airCondition.aqi}
                    </span>
                </div>
                <div className="weatherTodayDetail">
                    <ul>
                        <li>相对湿度:&nbsp;&nbsp;{this.props.weatherNow.humidity}%</li>
                        <li>能见度:&nbsp;&nbsp;{this.props.weatherNow.vis} km</li>
                        <li>日出:&nbsp;&nbsp;{this.props.weatherToday.sunrise}</li>
                        <li>日落:&nbsp;&nbsp;{this.props.weatherToday.sunset}</li>
                        <li>
                            月相:&nbsp;&nbsp;{this.props.weatherToday.moonPhase}&nbsp;&nbsp;
                            <img src={"/Icons/" + this.props.weatherToday.moonPhaseIcon + ".svg"} alt="Loading"
                                 width="20" height="20"/>&nbsp;
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default WeatherNow;