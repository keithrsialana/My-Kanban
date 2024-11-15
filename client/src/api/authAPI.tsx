import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin):Promise<any> => {
  // make a POST request to the login route
  const result = await fetch('/auth/login', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  }).then(async (response) => await response.json())
  .then((data) => {
    // check if token was returned
    if (!data.token){
      console.log("Invalid Credentials");
      return;
    }
    return data;
  })
  .catch((err) => {
    console.log("Invalid credentials:", err);
    return;
  });

  if (result.token)
    return result;
  result.message = "Invalid Credentials";
  return result;
}
export { login };
