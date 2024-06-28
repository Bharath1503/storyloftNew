


export const emailvalidate=email=>{
    const emailRegex=/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    return emailRegex.test(email)
}


export const passwordvalidate=password=>{
    const passwordRegex=/^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return passwordRegex.test(password)
}