document.addEventListener('DOMContentLoaded', function () {
  const blogSection = document.getElementById('blog-section');

  const entradasPredefinidas = [
    { title: 'Bienvenida', content: 'Bienvenidos a la sección de blog de la página, espero que disfruten de nuestros artículos sobre accesorios femeninos.', date: '01/01/2023', predefinida: true },
  ];

  function agregarEntradaAlDOM(entry) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('blog-post');

    const titleElement = document.createElement('h2');
    titleElement.textContent = entry.title;

    const contentElement = document.createElement('p');
    contentElement.innerHTML = entry.content;

    const dateElement = document.createElement('p');
    dateElement.classList.add('date');
    dateElement.textContent = `Fecha: ${entry.date}`;

    // Botones de editar y eliminar solo para entradas no predefinidas
    if (!entry.predefinida) {
      const editarButton = document.createElement('button');
      editarButton.textContent = 'Editar';
      editarButton.addEventListener('click', () => editarEntrada(entry));

      const eliminarButton = document.createElement('button');
      eliminarButton.textContent = 'Eliminar';
      eliminarButton.addEventListener('click', () => eliminarEntrada(entry, postDiv));

      postDiv.appendChild(editarButton);
      postDiv.appendChild(eliminarButton);
    }

    postDiv.appendChild(titleElement);
    postDiv.appendChild(contentElement);
    postDiv.appendChild(dateElement);

    // Agrega la entrada al final de la sección del blog
    blogSection.appendChild(postDiv);
  }

  // Agrega las entradas predefinidas al cargar la página
  entradasPredefinidas.forEach(agregarEntradaAlDOM);

  // Resto del código para la función agregarEntrada y otros eventos

  function agregarEntrada() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const date = obtenerFechaActual();
  
    const postDiv = document.createElement('div');
    postDiv.classList.add('blog-post');
  
    const titleElement = document.createElement('h2');
    titleElement.textContent = title;
  
    const contentElement = document.createElement('p');
    contentElement.innerHTML = content;
  
    const dateElement = document.createElement('p');
    dateElement.classList.add('date');
    dateElement.textContent = `Fecha: ${date}`;
  
    // Agrega la nueva entrada al final de la sección del blog
    postDiv.appendChild(titleElement);
    postDiv.appendChild(contentElement);
    postDiv.appendChild(dateElement);
    blogSection.appendChild(postDiv);
  
    // Botones de editar y eliminar solo para entradas no predefinidas
    const editarButton = document.createElement('button');
    editarButton.textContent = 'Editar';
    editarButton.addEventListener('click', () => editarEntrada({ title, content, date }));
  
    const eliminarButton = document.createElement('button');
    eliminarButton.textContent = 'Eliminar';
    eliminarButton.addEventListener('click', () => eliminarEntrada(null, postDiv)); // Pasamos null porque la nueva entrada no tiene objeto de entrada asociado
  
    // Agrega los botones de editar y eliminar debajo de la nueva entrada
    postDiv.appendChild(editarButton);
    postDiv.appendChild(eliminarButton);
  
    // Limpiar campos del formulario después de agregar la entrada
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
  
    // Mostrar mensaje de éxito después de limpiar los campos
    mostrarMensajeExito();
  }
  

  function editarEntrada(entry) {
    // Implementa la lógica para editar una entrada
    // Puedes abrir un formulario de edición, por ejemplo
    console.log('Editar entrada:', entry);
  }

  function eliminarEntrada(entry, entryDiv) {
    if (entry && entry.predefinida) {
      // Evitar la eliminación de entradas predefinidas
      alert('No puedes eliminar una entrada predefinida.');
      return;
    }

    // Implementa la lógica para eliminar una entrada
    // Puedes pedir confirmación al usuario antes de eliminar
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta entrada?');

    if (confirmacion) {
      // Elimina la entrada del DOM
      entryDiv.remove();

      // También podrías realizar acciones adicionales, como enviar una solicitud al servidor para eliminarla de la base de datos, si aplicable.
    }
  }

  function obtenerFechaActual() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('es-ES', options);
  }

  function mostrarMensajeExito() {
    const mensajeExito = document.createElement('p');
    mensajeExito.textContent = 'Se añadió la entrada con éxito.';
    mensajeExito.classList.add('exito-message');

    const addEntrySection = document.getElementById('add-entry');
    addEntrySection.appendChild(mensajeExito);

    // Eliminar el mensaje después de unos segundos (opcional)
    setTimeout(() => {
      mensajeExito.remove();
    }, 3000); // Eliminar después de 3 segundos (ajusta según sea necesario)
  }

  const agregarEntradaButton = document.getElementById('agregar-entrada-btn');
  agregarEntradaButton.addEventListener('click', agregarEntrada);
});
