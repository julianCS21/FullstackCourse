import React from 'react'
import ReactDOM from 'react-dom'
import { useState,useEffect } from 'react'



const StatisticsLine = ({text}) =>{
  return (
    <p>{text}</p>
  )

}


const Statistics = ({good,neutral,bad,allFeedbacks,average,postiveFeedbacks}) =>{

  if(allFeedbacks === 0){
    return (
      <h1>No feedback given</h1>
    )

  }


  return (
    <table>
      <tr>
        <td><p>good</p></td>
        <td><StatisticsLine text={good}></StatisticsLine></td>
      </tr>
      <tr>
        <td><p>neutral</p></td>
        <td><StatisticsLine text={neutral}></StatisticsLine></td>
      </tr>
      <tr>
        <td><p>bad</p></td>
        <td><StatisticsLine text={bad}></StatisticsLine></td>
      </tr>
      <tr>
        <td><p>all</p></td>
        <td><StatisticsLine text={allFeedbacks}></StatisticsLine></td>
      </tr>
      <tr>
        <td><p>average</p></td>
        <td><StatisticsLine text={average}></StatisticsLine></td>
      </tr>
      <tr>
        <td><p>positive</p></td>
        <td><StatisticsLine text={postiveFeedbacks + "%"}></StatisticsLine></td>
      </tr>
    </table>
  )


}

const Button = ({click,text}) =>{
  return(
    <button onClick={click}>{text}</button>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all,setAll] = useState(0)
  const [avgset,setAvg] =useState(0)
  const [positive,setPositive] =useState(0)


  const setFeedGood = () => {
    setGood(good + 1);
    setAll(all + 1)
  };
  
  const setFeedNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1)
  };
  
  const setFeedBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  };

  
  
  
  useEffect(() => {
    const calculateAverage = () => {
      let sum = good - bad;
      setAvg(sum/all || 0);
    };

    const calculatePositiveFeedback = () => {
      let percentage = (good * 100) / all;
      setPositive(percentage || 0);
    };

    calculateAverage();
    calculatePositiveFeedback();
  }, [good, bad, all]);
  


 



  return (
    <div>
      <h1>give feedback</h1>
      <Button click={() => setFeedGood()} text='good'></Button>
      <Button click={() => setFeedNeutral()} text='neutral'></Button>
      <Button click={() => setFeedBad()} text='bad'></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} allFeedbacks={all} average={avgset} postiveFeedbacks={positive} ></Statistics>
      
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))