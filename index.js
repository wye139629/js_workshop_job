
const burger = document.querySelector('#navbar-burger')
const jobpanel = document.getElementById('job-pannel')
const searchJob = document.getElementById('search-job')
burger.addEventListener('click',(e)=>{
  const burgerMenu = document.querySelector('#navbar-menu')
  e.target.classList.toggle('is-active')
  burgerMenu.classList.toggle('is-active')
})

// axios.get('https://still-spire-37210.herokuapp.com/positions.json')
//   .then(function (response) {
//     // handle success
//     return response.data
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function (data) {
//     // always executed
//     console.log(data)
//     const temp = document.querySelector('template')
//     data.forEach(item => {
//       temp.content.querySelector('h4 a').href = item.url
//       temp.content.querySelector('h4 a').textContent = item.title
//       temp.content.querySelector('.fulltime').textContent = item.type
//       temp.content.querySelector('.company').textContent = item.company
//       temp.content.querySelector('.location').textContent = item.location
//       let clone = document.importNode(temp.content,true)
//       jobpanel.appendChild(clone)
//     });
//   });


searchJob.addEventListener('submit',(e)=>{
e.preventDefault()
let desValue = searchJob.elements['description'].value
let locationValue = searchJob.elements['location'].value
let checkValue = searchJob.elements['full_time'].checked

if(checkValue){
  checkValue = 'on'
}

axios.get(`https://still-spire-37210.herokuapp.com/positions.json?description=${desValue}&location=${locationValue}&full_time=${checkValue}`)
.then(function (response) {
  // handle success
  return response.data
  console.log(response)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function (data) {
    // always executed
    console.log(data)
    const temp = document.querySelector('template')
    data.forEach(item => {
      temp.content.querySelector('h4 a').href = item.url
      temp.content.querySelector('h4 a').textContent = item.title
      temp.content.querySelector('.fulltime').textContent = item.type
      temp.content.querySelector('.company').textContent = item.company
      temp.content.querySelector('.location').textContent = item.location
      let clone = document.importNode(temp.content,true)
      jobpanel.appendChild(clone)
    });
  });

})




