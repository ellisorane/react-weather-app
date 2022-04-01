import React from 'react';


const SingleDay = ({ timestamp, max, min, icon }) => {
    // Convert timestamp to day of the week
    const date = new Date(timestamp * 1000);
    const day = date.getDay();
    const getDay = (dayNumber) => {
        switch(dayNumber) {
            case 0: return 'Sun';
            case 1: return 'Mon';
            case 2: return 'Tue';
            case 3: return 'Wed';
            case 4: return 'Thu';
            case 5: return 'Fri';
            case 6: return 'Sat';
            default: return 'Something went wrong. Try again.';
        }
    }

  const icon_temp = `http://openweathermap.org/img/wn/${icon}@2x.png`;


    return(
        <div className="singleDay"> 
            <div>
            {/* Weather Icon  */}
            <img src={icon_temp} alt='img' />
            </div>  
            <div>
            <h5>{getDay(day)}</h5>

            {/* High  */}
            <h5>High {max}°F</h5>
            {/* Low */}
            <h5>Low {min}°F</h5>

            </div>  
        </div>
    );
}

export default SingleDay;