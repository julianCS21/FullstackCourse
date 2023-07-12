import React, { useState,useEffect } from 'react'
import ReactDOM from 'react-dom'


const Vote = ({voteNow}) => {
  return (
    <button onClick={voteNow}>vote</button>
  )



}


const Button = ({nextAnecdote}) =>{
  return (
    <button onClick={nextAnecdote}>next anecdote</button>
  )

}


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [anecdoteMost,setAnecdote] = useState('')
  const [indexAnecdote,setIndex] = useState(0)

  const votesInit = {0 : 0, 1 : 0, 2 : 0, 3 : 0, 4 : 0, 5 : 0}
  
  const [votes,setVotes] = useState(votesInit)


  const next = () =>{
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const voteAnecdote = () =>{
    const newVotes = {...votes}
    newVotes[selected] += 1
    setVotes(newVotes)
    
  }

  useEffect(() => {
    const maxAnecdote = () => {
      let maxAnecdoteVoted = 0;
      let maxValue = -Infinity;
      for (let anecdote in votes) {
        if (votes[anecdote] > maxValue) {
          maxValue = votes[anecdote];
          maxAnecdoteVoted = anecdote;
        }
      }
      setAnecdote(props.anecdotes[maxAnecdoteVoted]);
      setIndex(maxAnecdoteVoted);
    };
  
    maxAnecdote();
  }, [votes, props.anecdotes]);

  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br></br>
      has {votes[selected]} votes
      <br></br>
      <Button nextAnecdote={next}></Button>
      <Vote voteNow={voteAnecdote}></Vote>
      <br></br>
      <h1>Anecdote with most votes</h1>
      <br></br>
      {anecdoteMost}
      <br></br>
      has {votes[indexAnecdote]} votes


    </div>
    
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)