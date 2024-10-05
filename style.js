
// Button link open fetch start
const lodecatagori= () =>{  
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res)=> res.json())
    .then((data)=>dispalycatagoirs(data.categories))
    .catch(error=> console.log(error))

};// Button link open fetch end

// category: "Music"
// category_id: "1001"

// Button  open fetch start-----
const dispalycatagoirs= (data) => {
   data.forEach((item)=>{
    const nav1=document.getElementById('nav_container');
    //    console.log(item)
       const button_container=document.createElement('Button')
       
       button_container.innerHTML=`
       <button class="btn-content btn " id="Button_${item.category_id}" onclick="Videochenge(${item.category_id})" > ${item.category}
       </button>
       `;

    nav1.appendChild(button_container)
   })
}// Button  open fetch end----

lodecatagori();

// Video container function link start
const lodeVideo=(searchText="")=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(res=>res.json())
    .then(data=> dispalyVideo(data.videos))
    .catch(err=>console.log(err))
}// Video container function link End

// Video container function Display start
const dispalyVideo=(videos)=>{
    const section_container=document.getElementById('section-container')
        
        section_container.innerHTML='';
        // Drawing Button start--------->
        if(videos.length ==0 ){
          section_container.classList.remove('grid')
        
          section_container.innerHTML=`
          <div class='text-center w-[300px] my-[50px]  mx-auto min-h-[300px]'>
          <img class="mx-auto min-w-[200px] " src='assas/icon.png' />
          <h1 class="text-lg font-bold my-[10px]">Oops!! Sorry, There is no content here</h>
          </div>
          `
        return
        }
        else{
          section_container.classList.add('grid');
        }
        // Drawing Button End--------->
   
    videos.forEach((item) =>{
        
        const card=document.createElement('div');
        card.classList='card card-compact'
        card.innerHTML=`
          <figure class=" h-[200px] relative">
    <img
    class="w-full h-full object-cover"
      src=${item.thumbnail}
      alt="pic" />

      ${item.others.posted_date.length==0 ? 
        '':`<span class='absolute bg-black right-2 bottom-2 p-2 rounded text-slate-600'>${TimeConvat(item.others.posted_date)}
      </span>`}
      
  </figure>
  
  <div class="py-2 ">
    <div class="flex gap-2">
    <img class="h-10 w-10 rounded-full object-cover" src=${item.authors[0].profile_picture}/>
    <div>
    <h2 class="font-bold ">${item.authors[0].profile_name} </h2>
       
      <div class="flex gap-2">
    <h2 class="text-slate-600">${item.title} </h2>
    
    ${item.authors[0].verified== true ?  '<img class="h-5 w-5 rounded-full object-cover" src="https://cdn-icons-png.freepik.com/256/11648/11648410.png?ga=GA1.1.1421817883.1720016004&semt=ais_hybrid"/>':'' }
    </div>
    <button onclick="Lodedetelis('${item.video_id}')" class='btn bg-error text-white btn-md' >detels</button>
   </div>
    
    </div>
  </div>`;

  section_container.appendChild(card) 
    })}// Video container function Display End
    lodeVideo();

    // card show function async start
const Lodedetelis=async (id)=>{
  const uri=`https://openapi.programming-hero.com/api/phero-tube/video/${id}`
  const res=await fetch(uri);
  const data=await res.json();
  displayTittle(data.video)
}

const displayTittle= (video)=>{
  
  const cardtext=document.getElementById('cardtext');
  cardtext.innerHTML=`
  <img src=${video.thumbnail}/>
  <p>${video.description}</p>
  `;
  document.getElementById('custumModal').showModal();
}
// card show function async start


// Time function ar kaj start
function TimeConvat(time){
    const hour=parseInt(time/3600)
    const recovariSecone=time % 3600;
    const minit=parseInt(recovariSecone/60)
    const secone=recovariSecone % 60;
    return(`hours: ${hour} minute: ${minit} second:${secone}`)
  }// Time function ar kaj End


// chenge your video function start
const Videochenge=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res)=> res.json())
    .then((data)=>{
      buttonStyle();
      const activeButton=document.getElementById(`Button_${id}`);
      activeButton.classList.add('active')
      console.log(activeButton)
      dispalyVideo(data.category)})
    .catch(error=> console.log(error))
}      // chenge your video function End


// button active color start
const buttonStyle =() =>{
  const btnclass=document.getElementsByClassName('btn-content');
  // console.log(btnclass)
   for(let btn of btnclass){
      //  console.log(btn);
       btn.classList.remove('active')

          
   }
}
// button active color End

// search input containar start
document.getElementById('search-container').addEventListener("keyup",(value)=>{
  lodeVideo(value.target.value);
} )


