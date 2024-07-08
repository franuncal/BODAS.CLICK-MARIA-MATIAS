//FORMULARIO CARRITO
document
  .getElementById("cart-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const btn = document.getElementById("button-f");
    btn.value = "Sending...";

    const serviceID = "default_service";
    const template_ID = "template_9dgtqpo";

    emailjs.sendForm(serviceID, template_ID, this).then(
      () => {
        btn.value = "Send Email";
        Swal.fire({
          title: "Muchas Gracias!",
          text: "Mensaje enviado correctamente!",
          icon: "success",
          showConfirmButton: false,
          iconColor: "#dbc0cf",
          timer: 2000,
        });
        
        closeModal();
        document.getElementById("cart-form").reset();
      },
      (err) => {
        btn.value = "Send Email";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Mensaje no enviado, intente nuevamente",
          showConfirmButton: false,
          timer: 2000,
        });
        console.error(JSON.stringify(err));
      }
    );
  });
