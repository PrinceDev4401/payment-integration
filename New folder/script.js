const wrapper = document.querySelector(".wrapper"),
signupHeader = document.querySelector(".signup header"),
loginHeader = document.querySelector(".login header");

loginHeader.addEventListener("click", () => {
  wrapper.classList.add("active");
});
signupHeader.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

function checkLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === '0555230618' && password === 'lalafalamar') {
      alert('Login successful!');
  } else {
      const errorMessage = document.getElementById('error-message');
      errorMessage.innerText = 'Incorrect Address or Password';
      document.getElementById('username').style.borderBottom = '1px solid red';
      document.getElementById('password').style.borderBottom = '1px solid red';
  }
}