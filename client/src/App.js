import { useState, useEffect } from 'react'

import { Toggle } from "./components/Toggle";
import './App.css';
// import data from './house.json';

const Room = ({ name, temperature, brightness, light }) => {
  const lamp = {
    content: "",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '60%',
    borderRadius: '50%',
    // boxShadow: "0px 0px 30px 10px #DBA632",
    boxShadow: 'inset 0px 0px 30px 10px #DBA632',
    backgroundColor: 'yellow',
    opacity: 0,
    WebkitFilter: 'blur(10px) saturate(2)'
  }
  //console.log(light)
  //console.log(brightness)

  if (light) {
    lamp.opacity = brightness
  }
  else {
    lamp.opacity = 0
  }
  
  return (
    <div>
      <div className='room' >
        <div style={lamp} />
        <div className='room-name'>
          {name}
        </div>
        <div className='room-temperature'>
          {temperature}° C
        </div>
      </div>
    </div>
  )
}

const House = ({ data }) => {
  return (
    <div className='house'>
      {data.rooms.map(room => {
        return <Room key={room.id} name={room.name} temperature={room.temperature} brightness={room.brightness} light={room.light} className={"room"} />
      }
    )}
    </div>
  )
}

const App = () => {
  useEffect(() => {
    fetch('http://localhost:3001/house')
      .then((response) => response.json())
      .then((data) => {
        setHouse(data); 
        setIsChecked(data.rooms[selectValue]["light"]);
        setRangeValue(data.rooms[selectValue]["brightness"]);
        // setTemperature(data.rooms[selectValue]["temperature"]);
      })
      .catch((error) => console.log(error));
  }, [])

  const [selectValue, setSelectValue] = useState(0);
  const [rangeValue, setRangeValue] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [temperatures, setTemperatures] = useState([]);
  const [house, setHouse] = useState({"rooms": [{"id": 0, "name": "", "brightness": 0, "light": false, "temperature": 0}]});

  setInterval(() => {
    fetch('http://localhost:3001/house')
      .then((response) => response.json())
      .then((data) => {
        // setHouse(data); 
      })
      .catch((error) => console.log(error));
  }, 3000);

  const handleTemperature = (e) => {
    const rangeValue = e.target.value;
    const id = selectValue;

    fetch(`http://localhost:3001/rooms/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ brightness: rangeValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        // update
        const updated = house;
        updated[id] = data
        setHouse(updated)

        console.log('update brightness')
      })
      .catch((error) => console.log(error));

    const updated = house;

    // console.log(updated.rooms[id]['brightness'])

    updated.rooms[id]['brightness'] = rangeValue
    setHouse(updated)
    setRangeValue(rangeValue);
  };

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
    setRangeValue(house.rooms[e.target.value].brightness)
    setIsChecked(house.rooms[e.target.value].light)
  };

  const handleRange = (e) => {
    const rangeValue = e.target.value;
    const id = selectValue;

    fetch(`http://localhost:3001/rooms/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ brightness: rangeValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        // update
        const updated = house;
        updated[id] = data
        setHouse(updated)

        console.log('update brightness')
      })
      .catch((error) => console.log(error));

    const updated = house;

    // console.log(updated.rooms[id]['brightness'])

    updated.rooms[id]['brightness'] = rangeValue
    setHouse(updated)
    setRangeValue(rangeValue);
  };

  const handleOnChange = () => {
    const toggleValue = !isChecked;
    const id = selectValue;

    fetch(`http://localhost:3001/rooms/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ light: toggleValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        // update
        const updated = house;
        updated[id] = data
        setHouse(updated)

        console.log('update light')
      })
      .catch((error) => console.log(error));

    const updated = house;

    // console.log(updated.rooms[id]['light'])

    updated.rooms[id]['light'] = toggleValue
    setHouse(updated)

    setIsChecked(toggleValue);
  };

  return (
    <div className='main-container'>
      <div className='left-container'>
        <House data={house} />
      </div>
      <div className='right-container'>
        <h1 className='selected-value'>{house.rooms[selectValue].name}</h1>
        <select value={selectValue} onChange={handleSelect}>
          {
            house.rooms.map(room => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>)
            )
          }
        </select>
        <h2>
          {selectValue}
        </h2>
        <Toggle
            label="light OFF/ON"
            toggled={isChecked}
            onClick={handleOnChange}
        />
        <input className="input-range" type="range" min={0} max={1} step={0.01} value={rangeValue} onChange={handleRange}></input>
        <p>{rangeValue}</p>
        <p className="temperature">
          Temperature: {house.rooms[selectValue].temperature}
        </p>
      </div>
    </div>
  )
}

export default App;
