const burger = document.querySelector('#navbar-burger')
const jobpanel = document.getElementById('job-pannel')
const searchJob = document.getElementById('search-job')
const temp = document.querySelector('template')
let nextbutton = document.querySelector('.pagination a')
burger.addEventListener('click',(e)=>{
  const burgerMenu = document.querySelector('#navbar-menu')
  e.target.classList.toggle('is-active')
  burgerMenu.classList.toggle('is-active')
})

// async function getAllData(){
//   let allData = []
//   let currentPage = 0
  
//   for(let i = currentPage; i<3; i++ ){
//   let response = await axios.get(`https://still-spire-37210.herokuapp.com/positions.json?/page=${i}`)
//   allData << await response.data
//   }
  
//   return allData
  
// }
// console.log(getAllData())



axios.get('https://still-spire-37210.herokuapp.com/positions.json?page=1')
  .then(function (response) {
    // handle success
    // console.log(response)
    return response.data
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function (data) {
    //  always executed
     
    data.forEach(item => {
      temp.content.querySelector('h4 a').href = item.url
      temp.content.querySelector('h4 a').textContent = item.title
      temp.content.querySelector('.fulltime').textContent = item.type
      temp.content.querySelector('.company').textContent = item.company
      temp.content.querySelector('.location').textContent = item.location
      let clone = document.importNode(temp.content,true)
      jobpanel.appendChild(clone)
    });


    if(data.length == 50){ 
      nextbutton.removeAttribute('disabled')
     let page = 1
     nextbutton.addEventListener('click',nextpage)
     function nextpage(){
       page+=1
       axios.get(`https://still-spire-37210.herokuapp.com/positions.json?page=${page}`)
       .then(response => { 
         // console.log(response)
         return response.data
        })
        .then((obj)=>{
          
          if (obj.length < 50){
            nextbutton.setAttribute('disabled',true)
            nextbutton.removeEventListener('click',nextpage)
          }
          obj.forEach(item => {
            temp.content.querySelector('h4 a').href = item.url
            temp.content.querySelector('h4 a').textContent = item.title
            temp.content.querySelector('.fulltime').textContent = item.type
            temp.content.querySelector('.company').textContent = item.company
            temp.content.querySelector('.location').textContent = item.location
            let newClone = document.importNode(temp.content,true)
            jobpanel.appendChild(newClone)
          })
        })
        
      }
    }
        
  });


searchJob.addEventListener('submit',(e)=>{
e.preventDefault()
let desValue = searchJob.elements['description'].value
let locationValue = searchJob.elements['location'].value
let checkValue = searchJob.elements['full_time'].checked

if(checkValue){
  checkValue = 'on'
}

jobpanel.innerHTML=''

axios.get(`https://still-spire-37210.herokuapp.com/positions.json?description=${desValue}&location=${locationValue}&full_time=${checkValue}&page=1`)
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
    // console.log(data)
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

     if(data.length == 50){ 
      nextbutton.removeAttribute('disabled')
      let searchpage = 1
      
      nextbutton.addEventListener('click',()=>{
       searchpage+=1
       axios.get(`https://still-spire-37210.herokuapp.com/positions.json?description=${desValue}&location=${locationValue}&full_time=${checkValue}&page=${searchpage}`)
        .then(response => { 
          console.log(response)
          return response.data
        })
        .then((obj)=>{
          
          if (obj.length < 50){
            nextbutton.setAttribute('disabled',true)
          }
          obj.forEach(item => {
            temp.content.querySelector('h4 a').href = item.url
            temp.content.querySelector('h4 a').textContent = item.title
            temp.content.querySelector('.fulltime').textContent = item.type
            temp.content.querySelector('.company').textContent = item.company
            temp.content.querySelector('.location').textContent = item.location
            let newClone = document.importNode(temp.content,true)
            jobpanel.appendChild(newClone)
        })
      })
      })


    }


  });

})




