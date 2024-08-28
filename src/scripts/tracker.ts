const blob = document.getElementById("blob");

document.body.onpointermove = (event) => {
  const { clientX, clientY } = event;
  
  if (blob) {
    blob.style.left = `${clientX}px`;
    blob.style.right = `${clientY}px`;
  }
};
