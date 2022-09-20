var links=document.querySelectorAll('.nav-link');
for(var i=0;i<links.length;i++){
links[i].addEventListener('click',function(e){
   
getRecipt(e.target.text);

});

}
var myRecipt=[];
getRecipt('pizza');

   async function getRecipt( meal ){
    var  response =await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
    var data= await response.json();
    myRecipt=data.recipes;
      
    displaydata();
    
    }
    
 



function displaydata(){
    var result=''
    for(var i=0;i<myRecipt.length;i++){
    result+=`
    <div class="col-md-12 text-center">
     <div class="data" >
     <h2 >${myRecipt[i].title}</h2>
     <img src="${myRecipt[i].image_url}">
     <a data-bs-toggle="modal" data-bs-target="#recipeModal"
     class="btn btn-light" onClick="openDetails(${myRecipt[i].recipe_id})">details</a>

     </div>


    </div>
    
    
    
    
    `


    }
    document.getElementById('data').innerHTML=result;
}

async function openDetails(recipe_id){
    var response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipe_id}`);
    var result = await response.json();
    var recipeDetails = result.recipe;
    var ingredients = recipeDetails.ingredients;
    var list = ``;
    for(var i=0;i<ingredients.length;i++){
        list+=`<li>
        ${ingredients[i]}
        </li>`
    }
    var data = `
    <h2>${recipeDetails.title}</h2>    
    <img src="${recipeDetails.image_url}" class="w-100" />
    <ul>
        ${list}
    </ul>
    <p>rank is ${recipeDetails.social_rank}</p>

    `;
    document.getElementById('recipeData').innerHTML=data;
}