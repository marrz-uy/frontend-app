const NewFooter = () => {
    console.log('llamate');
    return (
        <footer class="pie-pagina">
        <div class="grupo-1">
          <div class="box2">
            <figure>
              <a href="#">
                <img src="../images/feel2.png" alt=""/>
              </a>
            </figure>
          </div>
          <div class="box2">
            <h2>Sobre nosotros</h2>
            <p>MARRZ, es una empresa dedicada a el desarrollo de software a pedido.
              Nos especializamos en aplicaciones enteramentes webs (sin necesidad de disponer hardware)
            </p>
          </div>
          <div class="box2">
            <h2>Siguenos</h2>
            <div class="red-social">
              {/* <a href="#" class="fa fa-facebook"></a> */}
            {/*   <FontAwesomeIcon
              icon={faInstagram}
              className="fa fa-facebook"
            /> */}
              <a href="#" class="fa fa-instagram"></a>
              <a href="#" class="fa fa-twitter"></a>
              <a href="#" class="fa fa-youtube"></a>
            </div>
          </div>
        </div>
        <div class="grupo-2">
          <small>&copy; 2021 <b>MARRZ</b> - Todos los Derechos Reservados</small>
        </div>
        </footer>
    )
}

export default NewFooter