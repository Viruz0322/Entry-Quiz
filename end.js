 const username = document.querySelector('#username')
 const saveScoreBtn = document.querySelector('#saveScoreBtn')
 const finalScore = document.querySelector('#finalScore')
 const mostRecentScore = localStorage.getItem('mostRecentScore')

 const highScores = JSON.parse(localStorage.getItem('highScores')) || []
 
 const maxHighScores = 5

 finalScore.innerText = mostRecentScore

 //if the username is empty (!username) then the btn stays disabled
 username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
 })

 saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort;{(a,b) => {
        return b.score - a.score
    }}

    highScores.splice(10)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
 }