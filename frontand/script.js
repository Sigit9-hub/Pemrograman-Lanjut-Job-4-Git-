function fetchData() {
  fetch("http://localhost:3000/api/data?apikey=leutiss76")
  .then((res) => res.json( ))
  .then((data) => {
    const last = data[data.length - 1]; 
    console.log(data);
    document.getElementById("temperature").textContent = `${last.temperature}°C`;
    document.getElementById("humidity").textContent = `${last.humidity}%`;
    document.getElementById("pressure").textContent = `${last.pressure}Ph`;
    document.getElementById("wind").textContent = `${last.wind}m/s`;
    document.getElementById("light").textContent = `${last.light}Lux`;
  })
}

fetchData(); //menjalankan fungsi
setInterval(fetchData, 5000);

function login() {
    const password = document.getElementById('password').value;
    const message = document.getElementById('login-message');
    if (password === 'sigitganteng') {
      window.location.href = 'monitoring.html';
    } else {
      message.textContent = 'Password salah';
    }
  }
  
  function toggleActuator(name) {
    const log = document.getElementById('log-list');
    const li = document.createElement('li');
    li.textContent = `Aktuator ${name} diklik pada ${new Date().toLocaleTimeString()}`;
    log.appendChild(li);
  }
  
