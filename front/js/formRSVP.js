document
  .getElementById("open-form")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("form-modal").style.display = "block";
  });

document
  .getElementById("attendance-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const btn = document.getElementById("button");
    btn.value = "Sending...";

    const serviceID = "default_service";
    const templateID = "template_sxhhitp";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Send Email";
        Swal.fire({
          title: "Muchas Gracias!",
          text: "Formulario enviado correctamente!",
          icon: "success",
          showConfirmButton: false,
          iconColor: "#dbc0cf",
          timer: 2000,
        });
        closeModalf();
        document.getElementById("attendance-form").reset();
      },
      (err) => {
        btn.value = "Send Email";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Formulario no enviado, intente nuevamente",
          showConfirmButton: false,
          timer: 2000,
        });
        console.error(JSON.stringify(err));
      }
    );
  });

function closeModalf() {
  document.getElementById("form-modal").style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("form-modal");
  if (event.target == modal) {
    closeModalf();
  }
};

