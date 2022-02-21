import React, {Component} from 'react';
import './LifeSuggestion.css'

class LifeSuggestion extends Component {
    render() {
        return (
            <div className='lifeSuggestionContainer'>
                <ul className="suggestionList">
                    <li>
                        <img src={"/Icons/穿衣指数.png"} alt="Loading" width="70" height="70"/>
                        <span>
                            穿衣指数:{this.props.lifeSuggesion.clothes}
                        </span>
                    </li>
                    <li>
                        <img src={"/Icons/旅游指数.png"} alt="Loading" width="70" height="70"/>
                        <span>
                            旅游指数:{this.props.lifeSuggesion.travel}
                        </span>
                    </li>
                    <li>
                        <img src={"/Icons/感冒指数.png"} alt="Loading" width="70" height="70"/>
                        <span>
                            感冒指数:{this.props.lifeSuggesion.flu}
                        </span>
                    </li>
                    <li>
                        <img src={"/Icons/洗车指数.png"} alt="Loading" width="70" height="70"/>
                        <span>
                            洗车指数:{this.props.lifeSuggesion.car}
                        </span>
                    </li>
                </ul>
            </div>
        );
    }
}

export default LifeSuggestion;