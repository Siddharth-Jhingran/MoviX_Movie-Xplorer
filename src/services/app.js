// import axios from "axios";
// import { useEffect } from "react";

// function App() {
//   useEffect(() => {
//     axios.get("http://localhost:3000/api/test")
//       .then(res => console.log(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h1>Frontend Connected!</h1>
//     </div>
//   );
// }

// export default App;


const axios = require('axios');
let data = '';

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTg2ZjM1MjhjNzcwZWE2NmJkM2M3NiIsImlhdCI6MTc2MjkzNjgyNiwiZXhwIjoxNzYyOTQwNDI2fQ.0p5Jslq_p_VRmIwmwREVYdzu44WpcCEWFFWcSv14DT4'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
