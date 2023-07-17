
import { useState } from 'react';
import Countrie from './Countrie';

const Countries = ({ countries }) => {
  const [showInfo, setShowInfo] = useState({});

  const showInfoCountrie = (index) => {
    const newInfo = {...showInfo}

    newInfo[index] = true

    setShowInfo(newInfo)



  };

  if (countries.length > 10) {
    return <h1>Too many matches, specify another filter</h1>;
  }

  if (countries.length === 1) {
    return <Countrie infoCountrie={countries[0]} showInfo={true} show={() => showInfoCountrie(0)}></Countrie>;
  }

  return (
    <div>
      {countries.map((item, index) => (
        <div key={index}>
          <Countrie infoCountrie={item} showInfo={showInfo[index]} show={() => showInfoCountrie(index)}></Countrie>
        </div>
      ))}
    </div>
  );
};

export default Countries;
