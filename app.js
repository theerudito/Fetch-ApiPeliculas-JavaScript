let pagina = 1;
const botonAnterior = document.getElementById("btnAnterior")
const botonSiguiente = document.getElementById("btnSiguiente")


botonSiguiente.addEventListener("click", () =>{

if (pagina < 1000) {
	pagina += 1
	cargarPeliculas()
	}

})


botonAnterior.addEventListener("click", () =>{
	if (pagina > 1) {
		pagina -= 1
		cargarPeliculas()
		}
	})
	


const cargarPeliculas = async () => {
	
	try 

	{
	const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=5f65d66bcffc737ecb2ec91faa9ae44f&language=es-MX&page=${pagina}`)
	console.log(respuesta)

	// comrpobar si la respuesta es correcta
	if (respuesta.status === 200) { 
	 const datos = await respuesta.json()
	
	 let peliculas = ""
	 datos.results.forEach(pelicula => {
		 peliculas += `

		 			<div class="pelicula">
						 <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						 <h3 class="titulo">${pelicula.title}</h3>
					 </div> 
					 `
	 })


	 const contenedor = document.getElementById("contenedor").innerHTML = peliculas



	} else if (respuesta === 401) {
		console.log("Pusistes Mal La Llave");
	} else if (respuesta === 404) {
		console.log("La Pelicula que busca no existe");
	} else {
		console.log("Hubo un error en la busqueda");
	}
} catch(error) {
	console.log(error);
}

}


cargarPeliculas()