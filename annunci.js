
// let primoSpan = document.querySelector('#primoSpan');
// let secondoSpan = document.querySelector('#secondoSpan');
// let terzoSpan = document.querySelector('#terzoSpan');

// let nav1 = document.querySelector('#nav1');
// let containerNav = document.querySelector('#containerNav');
// let toggleri = document.querySelector('.toggleri');

// let logoPink = document.querySelector('.logoPink');
// let logoSky = document.querySelector('.logoSky');

// let check = false;


// // TOGGER MICROPHONE INVERTED

// toggleri.addEventListener('click', ()=>{

//     if(check == false){


//         toggleri.classList.remove('fa-flip-vertical');

//         check = true;

        


//     } else {


//         toggleri.classList.add('fa-flip-vertical');

//         check= false;

//     }

    

// });


// // INCREMENTO NUMERI SPAZIALI

// function settaIntervallo (finalNumber, elemento){

//     let counter = 0

//     let interval = setInterval ( ()=>{

//     counter = counter + 1

//     if(counter < finalNumber){

//         counter = counter + 1

//         elemento.innerHTML = counter;

//     } else {

//         clearInterval(interval);

//     }

//     } )

// }

// settaIntervallo(1000, primoSpan);

// settaIntervallo(1500, secondoSpan);

// settaIntervallo(2000, terzoSpan);



// // EVENTO SCROLL LOGO NAV

// window.addEventListener('scroll', ()=>{


//     if(window.scrollY > 0){

//         nav1.style.backgroundColor = '#1c2124';

//         containerNav.style.backgroundColor = '#1c2124';

//         nav1.style.height = '80px';

//         logoPink.classList.add('d-none');

//         logoSky.classList.remove('d-none');

//     } else {


//         nav1.style.backgroundColor = 'transparent';
//         nav1.style.height = '55px';
        
//         containerNav.style.backgroundColor = 'transparent';
        
//         logoSky.classList.add('d-none');

//         logoPink.classList.remove('d-none');

//     }

   

// })

fetch("./annunci.json").then( (response)=> response.json() ).then( (data)=>{

    function setCategories (){

        let categories = data.map ((el) => el.category);

        // console.log(categor)

        let categoriaUnica =[];

        let categoryWrapper = document.querySelector('#categoryWrapper');

        categories.forEach(category => {

            if(!categoriaUnica.includes(category)){

                categoriaUnica.push(category);
            }

        });
        
        categoriaUnica.forEach((category) =>{
            
            let div = document.createElement('div');

            div.classList.add('form-check');

            div.innerHTML = `
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1" checked>
                            ${category}
                            </label>
                            `
            categoryWrapper.appendChild(div);


        })
            
        

       
        console.log(categoriaUnica);
        
    }
    
    setCategories();

})