
let primoSpan = document.querySelector('#primoSpan');
let secondoSpan = document.querySelector('#secondoSpan');
let terzoSpan = document.querySelector('#terzoSpan');

let nav1 = document.querySelector('#nav1');
let containerNav = document.querySelector('#containerNav');
let toggleri = document.querySelector('.toggleri');

let logoPink = document.querySelector('.logoPink');
let logoSky = document.querySelector('.logoSky');

let check = false;


// TOGGER MICROPHONE INVERTED

toggleri.addEventListener('click', ()=>{

    if(check == false){


        toggleri.classList.remove('fa-flip-vertical');

        check = true;

        


    } else {


        toggleri.classList.add('fa-flip-vertical');

        check= false;

    }

    

});


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



// EVENTO SCROLL LOGO NAV

window.addEventListener('scroll', ()=>{


    if(window.scrollY > 0){

        nav1.style.backgroundColor = '#1c2124';

        containerNav.style.backgroundColor = '#1c2124';

        nav1.style.height = '80px';

        logoPink.classList.add('d-none');

        logoSky.classList.remove('d-none');

    } else {


        nav1.style.backgroundColor = 'transparent';
        nav1.style.height = '55px';
        
        containerNav.style.backgroundColor = 'transparent';
        
        logoSky.classList.add('d-none');

        logoPink.classList.remove('d-none');

    }

   

})

fetch("./annunci.json").then( (response)=> response.json() ).then( (data)=>{

    let annunci = document.querySelector('#annunci')

    let priceInput = document.querySelector('#priceInput')

    let numeroIncremento = document.querySelector('#numeroIncremento');

    let ricerca = document.querySelector('#ricerca');


    // SETTA CATEGORIE SENZA RIPETERLE

    function setCategories (){

        let categories = data.map ((el) => el.category);
        let categoriaUnica =[];

        let categoryWrapper = document.querySelector('#categoryWrapper');

        categories.forEach(category => {

            if(!categoriaUnica.includes(category)){

                categoriaUnica.push(category);
            }

        });
        
        categoriaUnica.forEach(categoria =>{
            
            let div = document.createElement('div');

            div.classList.add('form-check');

            div.innerHTML = `
            
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="${categoria}">
            <label class="form-check-label" for="${categoria}">
            ${categoria}
            </label>
            </ul>
                            

                            `
            categoryWrapper.appendChild(div);


        })
            
    }
    
    setCategories();


    // MOSTRA CARD TUTTE LE CATEGORIE

    function mostraCard(array){

        annunci.innerHTML = ``

        array.sort ((a , b) => Number(b.price - a.price));

        array.forEach( (el)=>{

       let div = document.createElement('div');

       div.classList.add('card' , 'm-3');

       div.style.width = '12rem';

       div.innerHTML = `
       
                            <ul class="list-group list-group-flush">
                            <img class="m-3" src="https://picsum.photos/101" alt="">
                            <li class="list-group-item">${el.name} </li>
                            <li class="list-group-item">${el.category}</li>
                            <li class="list-group-item">${el.price} €</li>
                            </ul>             

       `
       annunci.appendChild(div)

    })
     }

     mostraCard(data);


    //  FILTRA PER CATEGORIA

    function categorieFiltrate(array) {

        // TRASFORMO UNA NODE LIST/ ARRAY LIKE IN UN ARRAY CON IL METODO .FROM()
        // A PARTIRE DALLA NODE-LIST formCheckInputs TRASFORMALO IN UN ARRAY

        let arrayFromNodelist = Array.from(formCheckInputs);
        let button = arrayFromNodelist.find( (button) => button.checked)
        let categoria = button.id;

        if(categoria != 'All'){

        let filtered = array.filter((el)=> categoria == el.category)

        return filtered;

    } else {

        return data;

    }
    }


    // EVENTO RADIO BUTTON FILTRO PER CATEGORIA

    let formCheckInputs = document.querySelectorAll('.form-check-input');

    formCheckInputs.forEach( (el)=>{

        el.addEventListener ('click' , ()=>{

            globalFilter();

        })
    })


// FUNZIONE RANGE INCREMENTO NUMERI

function maxNumber(){

    let prezzi = data.map((elemento)=> Number(elemento.price));

    let maxPrice = (Math.max(...prezzi));

    priceInput.max = Math.ceil(maxPrice);

    priceInput.value = Math.ceil(maxPrice);
    
    numeroIncremento.innerHTML = Math.ceil(maxPrice);


}

maxNumber();



// FILTRO PER PREZZO

function filterByPrice (array){


    let filtratePerPrezzo =  array.filter((annuncio)=> (Number(annuncio.price) <= Number(priceInput.value)));
    
    return filtratePerPrezzo;

}

// EVENTO INPUT PREZZO

priceInput.addEventListener ('input' , ()=>{
 
    numeroIncremento.innerHTML = priceInput.value ;
    globalFilter();

})


// FILTRO PER PAROLA

function filterByWord (array){

    let nome = ricerca.value;

    let filtratePerParola = array.filter((annuncio)=> annuncio.name.toLowerCase().includes(nome.toLowerCase()));

    return filtratePerParola;
}


// EVENTO FILTRO PER PAROLA
ricerca.addEventListener('input' , ()=>{

    // incrementNumber.innerHTML = priceInput.value;

    globalFilter();

})


// FUNZIONE GLOBALE

function globalFilter(){

    let categorieFiltrate = categorieFiltrate(data);
    let filterByPrice = filterByPrice(categorieFiltrate);
    let filterByWord = filterByWord(filterByPrice);

    mostraCard(filterByWord);
}

globalFilter();
    
})

