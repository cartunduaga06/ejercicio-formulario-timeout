// Esta es la base de datos de nuestros usuarios
const baseDeDatos = {
  usuarios: [
    {
      id: 1,
      name: "Steve Jobs",
      email: "steve@jobs.com",
      password: "Steve123",
    },
    {
      id: 2,
      name: "Ervin Howell",
      email: "shanna@melissa.tv",
      password: "Ervin345",
    },
    {
      id: 3,
      name: "Clementine Bauch",
      email: "nathan@yesenia.net",
      password: "Floppy39876",
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      email: "julianne.oconner@kory.org",
      password: "MysuperPassword345",
    },
    {
      id: 4,
      name: "Carlos Andres",
      email: "cartunduaga@gmail.com",
      password: "123456",
    }
  ],
};

// ACTIVIDAD

// Paso a paso:

// 1) Escuchar el evento necesario para reaccionar cuando la persona
// haga click en el botón iniciar sesión.

// 2) El proceso de inicio de sesión deberá tener una demora de 3 segundos.
// Deberás agregar la función correspondiente para simular dicha demora.

// 3) Durante el tiempo indicado anteriormente, se deberá mostrar el mensaje "Iniciando sesión..."

// 4) A partir de los inputs ingresados en el formulario, se deberan realizar las siguientes validaciones:
// 1) Que el primer input sea un email válido.
// 2) Que la contraseña tenga al menos 5 caracteres.
// 3) Que los datos ingresados corresponden a una
// persona que se encuentre registrada en la base de datos.
// En caso de que alguna de las validaciones no sea exitosa,
// se deberá mostrar un mensaje de error que diga "Alguno de los datos ingresados son incorrectos"

// 5) En caso de que los datos ingresados sean correctos, se deberá ocultar el formulario y mostrar
// un mensaje de bienvenida al sitio.

/* 
TIPS:
  - Puedes averiguar acerca de la manera de validar el formato de un email utilizando Javascript, buscando
    en internet frases como "Validar email con Javascript o similar".

  - Recuerda que puedes seleccionar y manipular los elementos del archivo index.html, usando los
    recursos que Javascript te ofrece para ello. Además, en el archivo styles.css tiene algunas clases y 
    estilos predefinidos para ayudarte a completar la actividad.

  - También te dejamos algunos mensajes que te pueden ser de utilidad:
  
   Mensaje de error => <small>Alguno de los datos ingresados son incorrectos</small>

   Mensaje de bienvenida => "<h1> Bienvenido al sitio 😀 </h1>";

   ¡Manos a la obra!
 */
    let tiempo = 1000;
    let cronometro = 0;
    let contador = 0;

    if(sessionStorage.getItem("user") == null){
      
   document.querySelector('.login-btn').addEventListener('click', (event) => {
     //event.preventDefault();
      const email = document.getElementById('email-input').value;
      const password = document.getElementById('password-input').value;
      const user = baseDeDatos.usuarios.find((user) => user.email === email);
      if (user) {
        if (user.password === password) {
          cronometro =  setInterval(function(){
              contador++;
              console.log(contador);
              document.getElementById('loader').classList.remove('hidden');
              document.getElementById('loader').innerHTML = `<small>Iniciando Sesión...${contador}</small>`;
              sessionStorage.setItem('user', JSON.stringify(user));
              if(contador === 3){
              renderizar();
              salirSesion()
              clearInterval(cronometro);
              
          }}, tiempo);

          
        } else {
          document.getElementById('password-input').value = '';
          document.getElementById('password-input').placeholder = 'Contraseña incorrecta';
          document.getElementById('error-container').innerHTML = `<small>Contraseña incorrecta</small>`;
          document.getElementById('error-container').classList.remove('hidden');
        }
      } else {
        document.getElementById('email-input').value = '';
        document.getElementById('email-input').placeholder = 'Email incorrecto';
        document.getElementById('error-container').innerHTML = `<small>Correo incorrecto</small>`;
          document.getElementById('error-container').classList.remove('hidden');
      }
      
      if(email === '' || password === ''){
        document.getElementById('error-container').innerHTML = `<small>Alguno de los datos ingresados son incorrectos</small>`;
        document.getElementById('error-container').classList.remove('hidden');
      }

      if(password.length < 5){
        document.getElementById('password-input').value = '';
        document.getElementById('password-input').placeholder = 'Contraseña muy corta';
        document.getElementById('error-container').innerHTML = `<small>Contraseña muy corta</small>`;
        document.getElementById('error-container').classList.remove('hidden');
      }

    }); console.log(sessionStorage.getItem("user"));
  }else{
    renderizar();
    
    
  
     
  }

  function renderizar(html){
    document.querySelector('#form').style.display = 'none';
              document.querySelector('#mensaje').innerHTML = `<h1> Bienvenido1 ${JSON.parse(sessionStorage.getItem('user')).name} 😀 </h1>
    <div> </div><button class="btn login-btn" id="logout" data-toggle="modal" data-target="#exampleModal" >Cerrar Sesión</button> </div>` + (html==undefined?'':html);
    
    salirSesion();
  }

  function salirSesion(){
    let html=`
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Cerrar sesion</h5>
          
        </div>
        <div class="modal-body">
          ¿Estas seguro que deseas cerrar sesion?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" id="btn-cierre">Cerrar</button>
          <button type="button" class="btn btn-primary" id="btn-cancelar">Cancelar</button>
        </div>
      </div>
    </div>
  </div>`

    

    document.querySelector('#logout').addEventListener('click', (event) => {
      
      
    

    renderizar(html);
    document.querySelector("#btn-cierre").addEventListener('click', (event) => {
      sessionStorage.removeItem("user");
      console.log(event)
      location.reload();
    })
    document.querySelector("#btn-cancelar").addEventListener('click', (event) => {
      location.reload();
    });

    
  } );
  //cerrrar sesion
  
}

   
  
  
    // ACTIVIDAD

// Paso a paso:

// 1) Al momento de que la persona inicia sesión, si las validaciones que ya tenemos implementadas
// han sido exitosas, deberemos almacenar la información del usuario en el LocalStorage.

// 2) Al mensaje de bienvenida que ya teníamos implementado, deberemos agregarle el nombre de la
// persona y un botón de "Cerrar Sesión".

// 3) Una vez iniciada la sesión, la misma se deberá mantener en ese estado para el caso de que la persona
// recargue la página. Para ello, deberás validar si existe información del usuario al momento en
// que se produce la carga de la página, y en base a dicha condción decidir que elementos mostrar.

// 3) Para el caso de que la persona haga click en el botón "Cerrar Sesión", se deberá eliminar
// la información del usuario, mostrar un mensaje indicando que se ha cerrado la sesión, y recargar
// la página para mostrar nuevamente el formulario de login.

/* 
TIPS:
  - Para lograr los objetivos de este ejercicio, deberás valerte de algunos eventos y métodos que vimos en
    las clases anteriores. Te invitamos a que revises los recursos en caso de que tengas dudas, ya que allí
    encontrarás todas las respuestas que necesitas para completar la actividad.

  - Recuerda que puedes seleccionar y manipular los elementos del archivo index.html, usando los
    recursos que Javascript te ofrece para ello. Además, en el archivo styles.css tiene algunas clases y 
    estilos predefinidos para ayudarte a completar la actividad.

  - Al momento de guardar información del usuario en el navegador, recuerda que debemos almacenar solo la 
    información necesaria, y EN NINGUN CASO DEBEMOS GUARDAR LA CONTRASEÑA. Por ello, deberás seleccionar y
    separar la información que tienes que almacenar, a partir del objeto que contiene la información del 
    usuario.

   ¡Manos a la obra!
 */
