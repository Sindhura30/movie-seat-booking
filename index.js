const container = document.getElementById('container');
const unOccupiedSeats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movie = document.getElementById('movie-selector');

let ticketPrice = Number(movie.value);


//Populate ui
const populateUI = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if (selectedSeats && selectedSeats.length > 0) {
        unOccupiedSeats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    if (selectedMovieIndex) {
        movie.selectedIndex = selectedMovieIndex
    }
}

populateUI();


//Update selection count and price total
const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    const selectedSeatsIndex = [...selectedSeats].map(seat => {
        return [...unOccupiedSeats].indexOf(seat)
    })
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex));
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//set Movie selection
const setMovieSelection = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Seat Selection Event
container.addEventListener('click', (event) => {
    if (event.target.classList.contains('seat') && 
    !event.target.classList.contains('occupied')) {
        event.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

movie.addEventListener('change', (event) => {
    ticketPrice = Number(event.target.value);
    setMovieSelection(event.target.selectedIndex, event.target.value)
    updateSelectedCount();
})

updateSelectedCount();