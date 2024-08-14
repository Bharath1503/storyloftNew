export const emailvalidate = (email) => {
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
    return emailRegex.test(email);
  }
  
  export const passwordvalidate = (password) => {
   
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return passwordRegex.test(password);
  }
  

