var page = 1;
const key ='IFct1Ftj21qvbKd78mGnDzyQrbhYOyU9WfAexeeYfHI'




var form = document.querySelector('form');
var inputSearch = document.querySelector('#inputSearch');
var imgSection = document.querySelector('.img-section')
var showMoreBtn = document.querySelector('.show-more');
var message = document.querySelector('.message');
var totalSearch = document.querySelector('.total')
var source = document.querySelector('.source')


//
const result = () =>{
    form.addEventListener('submit', (e) =>{
        e.preventDefault();
        if(inputSearch.value !== ''){
            
            searchResult()
            imgSection.innerHTML = '';
        }else{
            init()
        }
    })
}
result()



const searchResult = async() => {
    try{
        var url = `https://api.unsplash.com/search/photos?per_page=20&client_id=${key}&page=${page}`;
        let response = await fetch(`${url}&query=${inputSearch.value}`)
        let data = await response.json()
    
    
            // console.log(data);
            
            var results = data.results
            var total = data.total
    
           message.innerText = `
            Your Total Search: ${total} 
           `
    
            if(total == 0){
                form.classList.add('active')
    
                setTimeout(() =>{
                    form.classList.remove('active')
                }, 1000)
            }
        //    console.log(results);
            
            for(let i = 0; i<results.length; i++){
                var result = results[i]
                // console.log(result);
                
                
                var wrapper = document.createElement('div');
                wrapper.classList.add('wrapper')
    
    
                wrapper.innerHTML = `
                    <div class="inner-container">
                            <img class="image" src=${result.urls.regular}>
                    </div>
                    <div class="description-container">
                        <div class="desc-section">
                            <div class="desc-image">
                                <img src=${result.user.profile_image.small}>
                            </div>
                            <p class="desc-name">${result.user.first_name}</p>
                        </div>
                        <a class = 'icon-container' href =${result.links.download}+'&force=true" download target='_blank'><i class = 'bi bi-arrow-down-circle-fill'></i></a>
                    </div>
                
                `
                imgSection.appendChild(wrapper)
            }
        
        showMoreBtn.style.display = 'block'
        source.style.display = 'block'
    }
    catch(error){
        message.innerText = `
            There is an error. 
        `
    }

}


showMoreBtn.addEventListener('click', ()=>{
    page +=1
    if(inputSearch.value !== ''){
        searchResult()
    } else{
        init()
    }   

})

const init = async() =>{
    try{
        let response = await fetch(`https://api.unsplash.com/photos/?per_page=20&page=${page}&client_id=${key}`)
        let data = await response.json() 
        // console.log(data);
    
    
        for(let j = 0; j < data.length; j++){
            let initialResult = data[j]
            // console.log(initialResult);
    
            var wrapper = document.createElement('div');
            wrapper.classList.add('wrapper')
    
            wrapper.innerHTML = `
            <div class="inner-container">
                <img class="image" src=${initialResult.urls.regular}>
            </div>
            <div class="description-container">
            <div class="desc-section">
                <div class="desc-image">
                    <img src=${initialResult.user.profile_image.small}>
                </div>
                <p class="desc-name">${initialResult.user.first_name}</p>
            </div>
                <a class = 'icon-container' href =${initialResult.links.download}+'&force=true" download target='_blank'><i class = 'bi bi-arrow-down-circle-fill'></i></a>
            </div>
            `
            imgSection.appendChild(wrapper)
    
    
                
        }
        
       showMoreBtn.style.display = 'block'
       source.style.display = 'block'
    }
    catch(error){
        if(TypeError){
            message.innerText = `*No Internet Connection*`
            message.style.color = 'red';
        }
        else{
            message.innerText = `${error}`
        }
            
    }
   
}


init()

